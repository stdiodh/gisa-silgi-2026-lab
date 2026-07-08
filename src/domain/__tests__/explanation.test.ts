import { describe, expect, it } from 'vitest';
import type { Question } from '../question';
import { nextChecksFor, parseExplanation } from '../explanation';

describe('explanation helpers', () => {
  it('"풀이 포인트"와 "키워드"를 분리한다', () => {
    const parsed = parseExplanation('풀이 포인트: 조건을 먼저 분리한다. 키워드: 요구사항, 기능');

    expect(parsed.point).toBe('조건을 먼저 분리한다.');
    expect(parsed.keywords).toBe('요구사항, 기능');
  });

  it('키워드 표식이 없는 일반 explanation은 풀이 포인트로 처리한다', () => {
    const parsed = parseExplanation('일반 설명만 있는 문장이다.');

    expect(parsed.point).toBe('일반 설명만 있는 문장이다.');
    expect(parsed.keywords).toBe('');
  });

  it('code-output 문제에는 코드 추적 체크 항목을 반환한다', () => {
    const checks = nextChecksFor({ type: 'code-output' } as Question);

    expect(checks).toContain('변수 변경 순서');
    expect(checks).toContain('최종 출력 형식');
  });
});
