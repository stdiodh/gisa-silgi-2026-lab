import { describe, expect, it } from 'vitest';
import { sampleQuestions } from '../../data/sampleQuestions';
import { generateMockQuestions } from '../scoringMock';

describe('generateMockQuestions', () => {
  it('2026 1회 경향 모의고사는 코드 출력 문제를 최소 7개 포함한다', () => {
    const questions = generateMockQuestions(sampleQuestions, {
      trend2026Round1: true,
      count: 20,
      random: () => 0.42,
    });
    expect(questions).toHaveLength(20);
    expect(questions.filter((question) => question.type === 'code-output')).toHaveLength(7);
  });
});
