import type { MockExamResult, Question } from './question';
import { gradeQuestion } from './scoring';
import { pickTrendWeightedQuestions } from './trendWeightedPicker';

export function getExamStatus(score: number): MockExamResult['status'] {
  if (score >= 60) return '합격권';
  if (score >= 45) return '위험';
  return '재학습 필요';
}

export function generateMockQuestions(
  questions: Question[],
  options: { trend2026Round1?: boolean; recentThreeYears?: boolean; count?: number; random?: () => number } = {},
) {
  return pickTrendWeightedQuestions(questions, options);
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
