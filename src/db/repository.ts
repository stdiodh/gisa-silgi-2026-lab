import { endOfDay, isSameDay, startOfDay } from 'date-fns';
import { sampleQuestions } from '../data/sampleQuestions';
import type {
  Attempt,
  MockExamResult,
  Question,
  QuestionFilters,
  ReviewRating,
  ReviewState,
  StudySession,
} from '../domain/question';
import { calculateNextReview, createInitialReviewState, isReviewDue } from '../domain/review';
import { db } from './schema';

export async function seedSampleQuestions() {
  const existing = await db.questions.count();
  if (existing === 0) {
    await db.questions.bulkPut(sampleQuestions);
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

export async function resetLocalData() {
  await db.transaction('rw', db.questions, db.attempts, db.reviews, db.sessions, db.mockResults, async () => {
    await Promise.all([
      db.questions.clear(),
      db.attempts.clear(),
      db.reviews.clear(),
      db.sessions.clear(),
      db.mockResults.clear(),
    ]);
  });
  await seedSampleQuestions();
}

export async function getDashboardStats(now = new Date()) {
  const [questions, attempts, todayAttempts, wrongAttempts, reviews, mockResults] = await Promise.all([
    getAllQuestions(),
    getAttempts(),
    getTodayAttempts(now),
    getWrongAttempts(),
    db.reviews.toArray(),
    getMockResults(),
  ]);

  const dueReviews = reviews.filter((review) => isReviewDue(review, now));
  const trendQuestions = questions.filter((question) => question.trend2026Round1);
  const answeredTrendIds = new Set(
    attempts
      .filter((attempt) => trendQuestions.some((question) => question.id === attempt.questionId))
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
    trendProgress:
      trendQuestions.length === 0 ? 0 : Math.round((answeredTrendIds.size / trendQuestions.length) * 100),
    recent7Days,
    weakTags: [...tagCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag, count]) => ({ tag, count })),
    latestMock: mockResults[0],
  };
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
