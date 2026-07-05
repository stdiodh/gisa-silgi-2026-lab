import { describe, expect, it } from 'vitest';
import { calculateNextReview, createInitialReviewState } from '../review';

describe('calculateNextReview', () => {
  it('again은 10분 뒤 복습으로 돌리고 약점으로 유지한다', () => {
    const now = new Date('2026-07-05T00:00:00.000Z');
    const next = calculateNextReview(createInitialReviewState('q1', now), 'again', now);
    expect(next.intervalDays).toBe(0);
    expect(next.isWeak).toBe(true);
    expect(new Date(next.nextReviewAt).getTime() - now.getTime()).toBe(10 * 60 * 1000);
  });

  it('2회 연속 정답이면 약점에서 해제된다', () => {
    const now = new Date('2026-07-05T00:00:00.000Z');
    const first = calculateNextReview(createInitialReviewState('q1', now), 'good', now);
    const second = calculateNextReview(first, 'good', new Date('2026-07-06T00:00:00.000Z'));
    expect(first.isWeak).toBe(true);
    expect(second.isWeak).toBe(false);
  });
});
