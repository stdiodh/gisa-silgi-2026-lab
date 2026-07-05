import { describe, expect, it } from 'vitest';
import { parseJsonImport } from '../importers';

describe('parseJsonImport', () => {
  it('유효한 JSON 문제를 검증한다', () => {
    const result = parseJsonImport(
      JSON.stringify({
        questions: [
          {
            id: 'local-001',
            title: '로컬 샘플',
            type: 'short-answer',
            chapter: 'SQL 응용',
            topic: 'DCL',
            tags: ['SQL'],
            priority: 'A',
            trend2026Round1: true,
            prompt: '권한 부여 명령은?',
            answer: 'GRANT',
            explanation: 'GRANT는 권한을 부여한다.',
            sourceNote: '개인 학습 자료',
          },
        ],
      }),
    );
    expect(result.errors).toHaveLength(0);
    expect(result.questions).toHaveLength(1);
  });

  it('필수 필드가 없으면 오류를 반환한다', () => {
    const result = parseJsonImport(JSON.stringify({ questions: [{ id: 'bad' }] }));
    expect(result.questions).toHaveLength(0);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
