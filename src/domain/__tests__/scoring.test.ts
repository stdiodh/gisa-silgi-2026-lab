import { describe, expect, it } from 'vitest';
import { sampleQuestions } from '../../data/sampleQuestions';
import { gradeQuestion } from '../scoring';

describe('gradeQuestion', () => {
  it('단답형은 공백과 대소문자를 정규화하고 alias를 허용한다', () => {
    const question = sampleQuestions.find((item) => item.id === 'sample-sql-004')!;
    expect(gradeQuestion(question, ' grant ').isCorrect).toBe(true);
  });

  it('코드 출력은 느슨한 채점에서 공백 차이를 허용한다', () => {
    const question = sampleQuestions.find((item) => item.id === 'sample-c-005')!;
    expect(gradeQuestion(question, '4   3   9').isCorrect).toBe(true);
  });

  it('코드 출력은 엄격 채점에서 공백 차이를 구분한다', () => {
    const question = sampleQuestions.find((item) => item.id === 'sample-c-005')!;
    expect(gradeQuestion(question, '4   3   9', { strictCodeOutput: true }).isCorrect).toBe(false);
  });
});
