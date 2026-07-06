import { endOfDay, isSameDay, startOfDay } from 'date-fns';
import { sampleQuestions } from '../data/sampleQuestions';
import type {
  Attempt,
  DailyMission,
  MockExamResult,
  Question,
  QuestionFilters,
  ReviewRating,
  ReviewState,
  StudySession,
  UserTraceStep,
  WrongAnalysis,
  WrongPattern,
} from '../domain/question';
import { buildDailyMission, calculateDailyStreak } from '../domain/dailyMission';
import { calculateNextReview, createInitialReviewState, isReviewDue } from '../domain/review';
import { toKstDateKey } from '../domain/studyPlan';
import { db } from './schema';

export async function seedSampleQuestions() {
  const existingIds = new Set((await db.questions.toArray()).map((question) => question.id));
  const missing = sampleQuestions.filter((question) => !existingIds.has(question.id));
  if (missing.length > 0) {
    await db.questions.bulkPut(missing);
  }
}

export async function getAllQuestions() {
  return db.questions.orderBy('id').toArray();
}

export async function getQuestionById(id: string) {
  return db.questions.get(id);
}

export async function upsertQuestions(questions: Question[]) {
  await db.questions.bulkPut(questions);
  return questions.length;
}

export async function deleteQuestion(id: string) {
  await db.transaction('rw', db.questions, db.attempts, db.reviews, async () => {
    await db.questions.delete(id);
    await db.attempts.where('questionId').equals(id).delete();
    await db.reviews.delete(id);
  });
}

export async function saveAttempt(attempt: Attempt) {
  return db.attempts.add(attempt);
}

export async function saveUserTraceSteps(steps: UserTraceStep[]) {
  if (!steps.length) return 0;
  await db.userTraceSteps.bulkAdd(steps);
  return steps.length;
}

export async function getUserTraceSteps(questionId: string, attemptId?: number) {
  const steps = await db.userTraceSteps.where('questionId').equals(questionId).toArray();
  return steps
    .filter((step) => (attemptId ? step.attemptId === attemptId : true))
    .sort((a, b) => a.step - b.step);
}

export async function getAttempts() {
  return db.attempts.orderBy('answeredAt').reverse().toArray();
}

export async function getAttemptsByQuestion(questionId: string) {
  return db.attempts.where('questionId').equals(questionId).reverse().sortBy('answeredAt');
}

export async function getWrongAttempts() {
  const attempts = await db.attempts.orderBy('answeredAt').reverse().toArray();
  return attempts.filter((attempt) => !attempt.isCorrect);
}

export async function recordWrongAnalysis(
  questionId: string,
  wrongReason: WrongAnalysis['wrongReason'],
  wrongPattern: WrongPattern,
  now = new Date(),
) {
  const previous = await db.wrongAnalyses.get(questionId);
  const next: WrongAnalysis = {
    questionId,
    wrongReason,
    wrongPattern,
    retryCount: (previous?.retryCount ?? 0) + 1,
    lastWrongAt: now.toISOString(),
    resolvedAt: undefined,
    mustReviewBeforeExam: true,
    updatedAt: now.toISOString(),
  };
  await db.wrongAnalyses.put(next);
  return next;
}

export async function resolveWrongAnalysis(questionId: string, now = new Date()) {
  const previous = await db.wrongAnalyses.get(questionId);
  if (!previous) return undefined;
  const next: WrongAnalysis = {
    ...previous,
    resolvedAt: now.toISOString(),
    mustReviewBeforeExam: false,
    updatedAt: now.toISOString(),
  };
  await db.wrongAnalyses.put(next);
  return next;
}

export async function getWrongAnalyses() {
  return db.wrongAnalyses.orderBy('lastWrongAt').reverse().toArray();
}

export async function getTodayAttempts(now = new Date()) {
  const start = startOfDay(now).toISOString();
  const end = endOfDay(now).toISOString();
  return db.attempts.where('answeredAt').between(start, end, true, true).toArray();
}

export async function getReviewMap() {
  const reviews = await db.reviews.toArray();
  return new Map(reviews.map((review) => [review.questionId, review]));
}

export async function getDueReviews(now = new Date()) {
  const reviews = await db.reviews.where('nextReviewAt').belowOrEqual(now.toISOString()).toArray();
  return reviews.filter((review) => isReviewDue(review, now));
}

export async function getDailyMission(dateOrNow: string | Date = new Date()) {
  const date = typeof dateOrNow === 'string' ? dateOrNow : toKstDateKey(dateOrNow);
  return db.dailyMissions.get(date);
}

export async function getOrCreateDailyMission(now = new Date()) {
  await seedSampleQuestions();
  const date = toKstDateKey(now);
  const existing = await db.dailyMissions.get(date);
  if (existing) return existing;

  const [questions, attempts] = await Promise.all([getAllQuestions(), getAttempts()]);
  const mission = buildDailyMission(questions, attempts, now);
  await db.dailyMissions.put(mission);
  return mission;
}

export async function completeDailyMission(
  date: string,
  payload: Pick<DailyMission, 'score' | 'total' | 'weakTagsAfterSession'>,
  now = new Date(),
) {
  const mission = await db.dailyMissions.get(date);
  if (!mission) throw new Error(`${date} Daily Mission이 없습니다.`);
  if (mission.completedAt) return mission;

  const completed: DailyMission = {
    ...mission,
    completedAt: now.toISOString(),
    score: payload.score,
    total: payload.total,
    weakTagsAfterSession: payload.weakTagsAfterSession ?? [],
    updatedAt: now.toISOString(),
  };
  await db.dailyMissions.put(completed);
  return completed;
}

export async function getDailyMissions() {
  return db.dailyMissions.orderBy('date').toArray();
}

export async function getCurrentDailyStreak(now = new Date()) {
  return calculateDailyStreak(await getDailyMissions(), now);
}

export async function getReviewState(questionId: string) {
  return db.reviews.get(questionId);
}

export async function applyReviewRating(questionId: string, rating: ReviewRating, now = new Date()) {
  const previous = (await db.reviews.get(questionId)) ?? createInitialReviewState(questionId, now);
  const next = calculateNextReview(previous, rating, now);
  next.questionId = questionId;
  await db.reviews.put(next);
  return next;
}

export async function markWeak(questionId: string, now = new Date()) {
  const previous = (await db.reviews.get(questionId)) ?? createInitialReviewState(questionId, now);
  const next: ReviewState = {
    ...previous,
    questionId,
    isWeak: true,
    consecutiveCorrect: 0,
    nextReviewAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
  await db.reviews.put(next);
  return next;
}

export async function saveStudySession(session: StudySession) {
  return db.sessions.add(session);
}

export async function saveMockResult(result: MockExamResult) {
  return db.mockResults.add(result);
}

export async function getMockResults() {
  return db.mockResults.orderBy('startedAt').reverse().toArray();
}

export async function getLocalDataCounts() {
  const [questions, attempts, reviews, sessions, mockResults, dailyMissions, wrongAnalyses, userTraceSteps] =
    await Promise.all([
      db.questions.count(),
      db.attempts.count(),
      db.reviews.count(),
      db.sessions.count(),
      db.mockResults.count(),
      db.dailyMissions.count(),
      db.wrongAnalyses.count(),
      db.userTraceSteps.count(),
    ]);

  return {
    questions,
    attempts,
    reviews,
    sessions,
    mockResults,
    dailyMissions,
    wrongAnalyses,
    userTraceSteps,
  };
}

export async function resetStudyProgress() {
  await db.transaction(
    'rw',
    [db.attempts, db.reviews, db.sessions, db.mockResults, db.dailyMissions, db.wrongAnalyses, db.userTraceSteps],
    async () => {
      await Promise.all([
        db.attempts.clear(),
        db.reviews.clear(),
        db.sessions.clear(),
        db.mockResults.clear(),
        db.dailyMissions.clear(),
        db.wrongAnalyses.clear(),
        db.userTraceSteps.clear(),
      ]);
    },
  );
}

export async function resetLocalData() {
  await db.transaction(
    'rw',
    [
      db.questions,
      db.attempts,
      db.reviews,
      db.sessions,
      db.mockResults,
      db.dailyMissions,
      db.wrongAnalyses,
      db.userTraceSteps,
    ],
    async () => {
      await Promise.all([
        db.questions.clear(),
        db.attempts.clear(),
        db.reviews.clear(),
        db.sessions.clear(),
        db.mockResults.clear(),
        db.dailyMissions.clear(),
        db.wrongAnalyses.clear(),
        db.userTraceSteps.clear(),
      ]);
    },
  );
  await seedSampleQuestions();
}

export async function getDashboardStats(now = new Date()) {
  await seedSampleQuestions();
  const [questions, attempts, todayAttempts, wrongAttempts, reviews, mockResults, dailyMission, streak, wrongAnalyses] = await Promise.all([
    getAllQuestions(),
    getAttempts(),
    getTodayAttempts(now),
    getWrongAttempts(),
    db.reviews.toArray(),
    getMockResults(),
    getOrCreateDailyMission(now),
    getCurrentDailyStreak(now),
    getWrongAnalyses(),
  ]);

  const dueReviews = reviews.filter((review) => isReviewDue(review, now));
  const trendQuestions = questions.filter((question) => question.trend2026Round1);
  const recentQuestions = questions.filter((question) => question.sourceYear && question.sourceYear >= 2023);
  const answeredTrendIds = new Set(
    attempts
      .filter((attempt) => trendQuestions.some((question) => question.id === attempt.questionId))
      .map((attempt) => attempt.questionId),
  );
  const answeredRecentIds = new Set(
    attempts
      .filter((attempt) => recentQuestions.some((question) => question.id === attempt.questionId))
      .map((attempt) => attempt.questionId),
  );
  const weakQuestionIds = new Set(reviews.filter((review) => review.isWeak).map((review) => review.questionId));
  wrongAttempts.forEach((attempt) => weakQuestionIds.add(attempt.questionId));

  const tagCounts = new Map<string, number>();
  for (const question of questions) {
    if (!weakQuestionIds.has(question.id)) continue;
    question.tags.forEach((tag) => tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1));
  }

  const recent7Days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (6 - index));
    return {
      date: date.toISOString().slice(0, 10),
      count: attempts.filter((attempt) => isSameDay(new Date(attempt.answeredAt), date)).length,
    };
  });

  return {
    totalQuestions: questions.length,
    todaySolved: todayAttempts.length,
    dueReviewCount: dueReviews.length,
    wrongCount: wrongAttempts.length,
    dailyMission,
    streak,
    remainingSessions: Math.max(0, Math.ceil((new Date('2026-07-19T00:00:00+09:00').getTime() - now.getTime()) / (24 * 60 * 60 * 1000))),
    trendProgress:
      trendQuestions.length === 0 ? 0 : Math.round((answeredTrendIds.size / trendQuestions.length) * 100),
    recentProgress:
      recentQuestions.length === 0 ? 0 : Math.round((answeredRecentIds.size / recentQuestions.length) * 100),
    codeAccuracy: calculateAccuracy(
      attempts,
      questions.filter((question) => question.type === 'code-output').map((question) => question.id),
    ),
    sqlAccuracy: calculateAccuracy(
      attempts,
      questions.filter((question) => question.language === 'SQL' || question.type === 'sql-result').map((question) => question.id),
    ),
    wrongResolvedRate: wrongAnalyses.length
      ? Math.round((wrongAnalyses.filter((analysis) => analysis.resolvedAt).length / wrongAnalyses.length) * 100)
      : 0,
    recent7Days,
    weakTags: [...tagCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag, count]) => ({ tag, count })),
    latestMock: mockResults[0],
  };
}

function calculateAccuracy(attempts: Attempt[], questionIds: string[]) {
  const idSet = new Set(questionIds);
  const scoped = attempts.filter((attempt) => idSet.has(attempt.questionId));
  if (!scoped.length) return 0;
  return Math.round((scoped.filter((attempt) => attempt.isCorrect).length / scoped.length) * 100);
}

export async function filterQuestions(filters: QuestionFilters) {
  const [questions, attempts, reviewMap] = await Promise.all([getAllQuestions(), getAttempts(), getReviewMap()]);
  const wrongIds = new Set(attempts.filter((attempt) => !attempt.isCorrect).map((attempt) => attempt.questionId));
  const now = new Date();

  return questions.filter((question) => {
    const keyword = filters.keyword?.trim().toLowerCase();
    if (
      keyword &&
      ![
        question.title,
        question.prompt,
        question.topic,
        question.chapter,
        question.answer,
        question.explanation,
        ...question.tags,
      ]
        .join(' ')
        .toLowerCase()
        .includes(keyword)
    ) {
      return false;
    }

    if (filters.chapter && filters.chapter !== 'all' && question.chapter !== filters.chapter) return false;
    if (filters.tag && filters.tag !== 'all' && !question.tags.includes(filters.tag)) return false;
    if (filters.language && filters.language !== 'all' && question.language !== filters.language) return false;
    if (filters.type && filters.type !== 'all' && question.type !== filters.type) return false;
    if (filters.priority && filters.priority !== 'all' && question.priority !== filters.priority) return false;
    if (filters.sourceYear && filters.sourceYear !== 'all' && question.sourceYear !== filters.sourceYear) return false;
    if (filters.sourceRound && filters.sourceRound !== 'all' && question.sourceRound !== filters.sourceRound) return false;
    if (filters.sourceKind && filters.sourceKind !== 'all' && question.sourceKind !== filters.sourceKind) return false;
    if (
      filters.sourceConfidence &&
      filters.sourceConfidence !== 'all' &&
      question.sourceConfidence !== filters.sourceConfidence
    ) {
      return false;
    }
    if (
      filters.trend2026Round1 !== undefined &&
      filters.trend2026Round1 !== 'all' &&
      question.trend2026Round1 !== filters.trend2026Round1
    ) {
      return false;
    }
    if (filters.wrongOnly && !wrongIds.has(question.id)) return false;
    if (filters.dueOnly) {
      const review = reviewMap.get(question.id);
      if (!review || !isReviewDue(review, now)) return false;
    }

    return true;
  });
}
