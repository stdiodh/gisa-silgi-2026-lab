import type { MockExamResult, Question } from './question';
import { gradeQuestion } from './scoring';

export function getExamStatus(score: number): MockExamResult['status'] {
  if (score >= 60) return '합격권';
  if (score >= 45) return '위험';
  return '재학습 필요';
}

export function generateMockQuestions(
  questions: Question[],
  options: { trend2026Round1?: boolean; count?: number; random?: () => number } = {},
) {
  const count = options.count ?? 20;
  const random = options.random ?? Math.random;
  const pool = options.trend2026Round1 ? questions.filter((question) => question.trend2026Round1) : questions;
  const shuffled = [...pool].sort(() => random() - 0.5);

  if (!options.trend2026Round1) {
    return shuffled.slice(0, count);
  }

  const codeQuestions = shuffled.filter((question) => question.type === 'code-output');
  const selected = codeQuestions.slice(0, Math.min(7, codeQuestions.length));
  const selectedIds = new Set(selected.map((question) => question.id));
  const rest = shuffled.filter((question) => !selectedIds.has(question.id));

  return [...selected, ...rest].slice(0, count);
}

export function gradeMockExam(
  questions: Question[],
  answers: Record<string, string>,
  trend2026Round1 = false,
  startedAt = new Date(),
  endedAt = new Date(),
): MockExamResult {
  let correct = 0;
  const sectionScores: MockExamResult['sectionScores'] = {};

  for (const question of questions) {
    const result = gradeQuestion(question, answers[question.id] ?? '');
    const section = question.chapter;
    sectionScores[section] ??= { correct: 0, total: 0 };
    sectionScores[section].total += 1;

    if (result.isCorrect) {
      correct += 1;
      sectionScores[section].correct += 1;
    }
  }

  const score = correct * 5;

  return {
    startedAt: startedAt.toISOString(),
    endedAt: endedAt.toISOString(),
    trend2026Round1,
    questionIds: questions.map((question) => question.id),
    answers,
    score,
    total: questions.length * 5,
    status: getExamStatus(score),
    sectionScores,
  };
}
