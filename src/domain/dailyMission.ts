import type { Attempt, DailyMission, Question } from './question';
import { generateMockQuestions } from './scoringMock';
import { calculateDday, EXAM_DATE, getFixedPlanByDate, toKstDateKey } from './studyPlan';

function uniqueQuestions(questions: Question[]) {
  const seen = new Set<string>();
  return questions.filter((question) => {
    if (seen.has(question.id)) return false;
    seen.add(question.id);
    return true;
  });
}

function pick(questions: Question[], amount: number, used: Set<string>) {
  const picked: Question[] = [];
  for (const question of questions) {
    if (picked.length >= amount) break;
    if (used.has(question.id)) continue;
    used.add(question.id);
    picked.push(question);
  }
  return picked;
}

function focusedQuestions(questions: Question[], planTitle: string) {
  if (planTitle.includes('C 집중')) return questions.filter((question) => question.language === 'C');
  if (planTitle.includes('Java')) return questions.filter((question) => question.language === 'Java');
  if (planTitle.includes('Python')) return questions.filter((question) => question.language === 'Python');
  if (planTitle.includes('SQL')) return questions.filter((question) => question.language === 'SQL' || question.chapter.includes('SQL'));
  if (planTitle.includes('DB')) return questions.filter((question) => question.chapter.includes('데이터베이스') || question.tags.includes('자료구조'));
  if (planTitle.includes('보안')) return questions.filter((question) => question.chapter.includes('보안') || question.tags.includes('네트워크'));
  if (planTitle.includes('테스트')) return questions.filter((question) => question.chapter.includes('소프트웨어') || question.tags.includes('테스트'));
  if (planTitle.includes('최근 3년')) return generateMockQuestions(questions, { recentThreeYears: true, count: 20, random: () => 0.42 });
  return questions;
}

export function buildDailyMission(
  questions: Question[],
  attempts: Attempt[],
  now = new Date(),
): DailyMission {
  const date = toKstDateKey(now);
  const dday = calculateDday(now, new Date(EXAM_DATE));
  const fixedPlan = getFixedPlanByDate(date);
  const title = fixedPlan?.title ?? (dday <= 3 && dday > 0 ? '실전 모의고사 + 오답 복습' : '오늘의 1회 학습');
  const focus = fixedPlan?.focus ?? ['워밍업 암기', '코드 출력 추적', 'SQL/DB', '오답 복습'];
  const nowIso = now.toISOString();

  if (dday === 0) {
    return {
      date,
      dday,
      title,
      focus,
      questionIds: [],
      requiredCodeTraceCount: 0,
      requiredWrongReviewCount: 0,
      createdAt: nowIso,
      updatedAt: nowIso,
    };
  }

  const sorted = uniqueQuestions(
    [...questions].sort((a, b) => {
      const priorityOrder = { A: 0, B: 1, C: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority] || a.id.localeCompare(b.id);
    }),
  );
  const wrongIds = [...new Set(attempts.filter((attempt) => !attempt.isCorrect).map((attempt) => attempt.questionId))];
  const wrongQuestions = wrongIds
    .map((id) => sorted.find((question) => question.id === id))
    .filter(Boolean) as Question[];

  if (dday <= 3 && dday > 0) {
    const mock = generateMockQuestions(sorted, { trend2026Round1: true, count: 20, random: () => 0.42 });
    const mockIds = new Set(mock.map((question) => question.id));
    const wrongReview = wrongQuestions.filter((question) => !mockIds.has(question.id)).slice(0, 10);
    const questionIds = [...mock, ...wrongReview].map((question) => question.id);
    return {
      date,
      dday,
      title,
      focus,
      questionIds,
      requiredCodeTraceCount: 7,
      requiredWrongReviewCount: Math.min(10, wrongReview.length),
      createdAt: nowIso,
      updatedAt: nowIso,
    };
  }

  const used = new Set<string>();
  const focusPool = focusedQuestions(sorted, title);
  const warmup = pick(
    sorted.filter((question) => question.type !== 'code-output' && question.type !== 'sql-result'),
    5,
    used,
  );
  const code = pick(
    focusPool.filter((question) => question.type === 'code-output').concat(sorted.filter((question) => question.type === 'code-output')),
    title.includes('코드 출력 10문항') ? 10 : 5,
    used,
  );
  const sqlDb = pick(
    sorted.filter((question) => question.language === 'SQL' || question.chapter.includes('데이터베이스')),
    3,
    used,
  );
  const concept = pick(
    sorted.filter(
      (question) =>
        question.chapter.includes('보안') ||
        question.chapter.includes('네트워크') ||
        question.chapter.includes('소프트웨어') ||
        question.tags.some((tag) => ['테스트', '디자인패턴', '패턴'].includes(tag)),
    ),
    4,
    used,
  );
  const wrongReview = pick(wrongQuestions, 3, used);
  const selected = [...warmup, ...code, ...sqlDb, ...concept, ...wrongReview];
  const fill = pick(sorted, Math.max(0, 20 - selected.length), used);
  const questionIds = [...selected, ...fill].slice(0, 20).map((question) => question.id);

  return {
    date,
    dday,
    title,
    focus,
    questionIds,
    requiredCodeTraceCount: title.includes('코드 출력 10문항') ? 10 : 5,
    requiredWrongReviewCount: Math.min(3, wrongReview.length),
    createdAt: nowIso,
    updatedAt: nowIso,
  };
}

export function calculateDailyStreak(missions: DailyMission[], now = new Date()) {
  const completedDates = new Set(missions.filter((mission) => mission.completedAt).map((mission) => mission.date));
  let cursor = toKstDateKey(now);
  let streak = 0;

  while (completedDates.has(cursor)) {
    streak += 1;
    const [year, month, day] = cursor.split('-').map(Number);
    cursor = new Date(Date.UTC(year, month - 1, day - 1)).toISOString().slice(0, 10);
  }

  return streak;
}
