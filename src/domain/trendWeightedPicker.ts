import type { Question, QuestionLanguage } from './question';

export interface PickOptions {
  count?: number;
  trend2026Round1?: boolean;
  recentThreeYears?: boolean;
  random?: () => number;
}

const codeLanguages: QuestionLanguage[] = ['C', 'Java', 'Python'];

function stableShuffle<T>(items: T[], random: () => number) {
  return [...items].sort(() => random() - 0.5);
}

function canAddQuestion(question: Question, selected: Question[], count: number) {
  const topicCount = selected.filter((item) => item.topic === question.topic).length;
  if (topicCount >= 3) return false;

  const lowCount = selected.filter((item) => item.sourceConfidence === 'low').length;
  const lowLimit = Math.floor(count * 0.3);
  if (question.sourceConfidence === 'low' && lowCount >= lowLimit) return false;

  return !selected.some((item) => item.id === question.id);
}

function addFromPool(selected: Question[], pool: Question[], count: number) {
  for (const question of pool) {
    if (selected.length >= count) break;
    if (canAddQuestion(question, selected, count)) selected.push(question);
  }
}

function addRequired(selected: Question[], pool: Question[], amount: number, count: number) {
  const already = selected.length;
  addFromPool(selected, pool, Math.min(count, already + amount));
}

function pickTrendQuestions(pool: Question[], count: number, random: () => number) {
  const selected: Question[] = [];
  const shuffled = stableShuffle(pool, random);

  for (const language of codeLanguages) {
    addRequired(
      selected,
      shuffled.filter((question) => question.type === 'code-output' && question.language === language),
      2,
      count,
    );
  }

  addRequired(
    selected,
    shuffled.filter((question) => question.type === 'code-output'),
    Math.max(0, 7 - selected.filter((question) => question.type === 'code-output').length),
    count,
  );
  addRequired(
    selected,
    shuffled.filter((question) => question.language === 'SQL' || question.type === 'sql-result'),
    Math.max(0, 2 - selected.filter((question) => question.language === 'SQL' || question.type === 'sql-result').length),
    count,
  );
  addFromPool(selected, shuffled, count);

  return selected.slice(0, count);
}

function pickRecentThreeYearsQuestions(pool: Question[], count: number, random: () => number) {
  const selected: Question[] = [];
  const shuffled = stableShuffle(pool, random);
  const yearGroups = [2023, 2024, 2025, 2026].map((year) => shuffled.filter((question) => question.sourceYear === year));

  for (const group of yearGroups) {
    addRequired(selected, group, 2, count);
  }

  addRequired(
    selected,
    shuffled.filter((question) => question.type === 'code-output'),
    Math.max(0, 7 - selected.filter((question) => question.type === 'code-output').length),
    count,
  );
  addRequired(
    selected,
    shuffled.filter((question) => question.language === 'SQL' || question.type === 'sql-result'),
    Math.max(0, 2 - selected.filter((question) => question.language === 'SQL' || question.type === 'sql-result').length),
    count,
  );
  addFromPool(selected, shuffled, count);

  return selected.slice(0, count);
}

export function pickTrendWeightedQuestions(questions: Question[], options: PickOptions = {}) {
  const count = options.count ?? 20;
  const random = options.random ?? Math.random;
  const eligible = questions.filter((question) => (question as { originalIncluded?: boolean }).originalIncluded !== true);

  if (options.recentThreeYears) {
    return pickRecentThreeYearsQuestions(
      eligible.filter((question) => question.sourceYear && question.sourceYear >= 2023 && question.sourceYear <= 2026),
      count,
      random,
    );
  }

  if (options.trend2026Round1) {
    return pickTrendQuestions(
      eligible.filter((question) => question.trend2026Round1),
      count,
      random,
    );
  }

  return stableShuffle(eligible, random).slice(0, count);
}

export function summarizePickQuality(questions: Question[]) {
  const topicCounts = new Map<string, number>();
  const years = new Set<number>();
  let lowConfidence = 0;
  let codeOutput = 0;
  let sql = 0;

  for (const question of questions) {
    topicCounts.set(question.topic, (topicCounts.get(question.topic) ?? 0) + 1);
    if (question.sourceYear) years.add(question.sourceYear);
    if (question.sourceConfidence === 'low') lowConfidence += 1;
    if (question.type === 'code-output') codeOutput += 1;
    if (question.language === 'SQL' || question.type === 'sql-result') sql += 1;
  }

  return {
    codeOutput,
    sql,
    yearCount: years.size,
    lowConfidenceRatio: questions.length ? lowConfidence / questions.length : 0,
    maxTopicCount: Math.max(0, ...topicCounts.values()),
  };
}
