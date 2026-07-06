import { describe, expect, it } from 'vitest';
import { sampleQuestions } from '../../data/sampleQuestions';
import { generateMockQuestions } from '../scoringMock';
import { summarizePickQuality } from '../trendWeightedPicker';

describe('generateMockQuestions', () => {
  it('2026 1회 경향 모의고사는 코드 출력 문제를 최소 7개 포함한다', () => {
    const questions = generateMockQuestions(sampleQuestions, {
      trend2026Round1: true,
      count: 20,
      random: () => 0.42,
    });
    expect(questions).toHaveLength(20);
    expect(questions.filter((question) => question.type === 'code-output').length).toBeGreaterThanOrEqual(7);
  });

  it('모의고사는 SQL 최소 2문항과 topic 중복 제한을 만족한다', () => {
    const questions = generateMockQuestions(sampleQuestions, {
      trend2026Round1: true,
      count: 20,
      random: () => 0.42,
    });
    const quality = summarizePickQuality(questions);
    expect(quality.sql).toBeGreaterThanOrEqual(2);
    expect(quality.maxTopicCount).toBeLessThanOrEqual(3);
    expect(quality.lowConfidenceRatio).toBeLessThanOrEqual(0.3);
  });

  it('최근 3년 모의고사는 sourceYear를 최소 2개 이상 포함한다', () => {
    const questions = generateMockQuestions(sampleQuestions, {
      recentThreeYears: true,
      count: 20,
      random: () => 0.42,
    });
    expect(summarizePickQuality(questions).yearCount).toBeGreaterThanOrEqual(2);
  });
});
