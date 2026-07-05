import { addDays, addMinutes } from 'date-fns';
import type { ReviewRating, ReviewState } from './question';

const defaultEaseFactor = 2.5;

export function createInitialReviewState(questionId: string, now = new Date()): ReviewState {
  return {
    questionId,
    repetition: 0,
    intervalDays: 0,
    easeFactor: defaultEaseFactor,
    nextReviewAt: now.toISOString(),
    consecutiveCorrect: 0,
    isWeak: true,
    updatedAt: now.toISOString(),
  };
}

export function calculateNextReview(
  previous: ReviewState | undefined,
  rating: ReviewRating,
  now = new Date(),
): ReviewState {
  const base = previous ?? createInitialReviewState('', now);
  let repetition = base.repetition;
  let intervalDays = base.intervalDays;
  let easeFactor = base.easeFactor || defaultEaseFactor;
  let nextReviewAt: Date;
  let consecutiveCorrect = base.consecutiveCorrect;

  if (rating === 'again') {
    repetition = 0;
    intervalDays = 0;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    consecutiveCorrect = 0;
    nextReviewAt = addMinutes(now, 10);
  } else if (rating === 'hard') {
    repetition += 1;
    intervalDays = Math.max(1, Math.round(intervalDays * 1.2) || 1);
    easeFactor = Math.max(1.3, easeFactor - 0.15);
    consecutiveCorrect += 1;
    nextReviewAt = addDays(now, intervalDays);
  } else if (rating === 'good') {
    repetition += 1;
    intervalDays = repetition === 1 ? 1 : repetition === 2 ? 3 : Math.max(3, Math.round(intervalDays * easeFactor));
    consecutiveCorrect += 1;
    nextReviewAt = addDays(now, intervalDays);
  } else {
    repetition += 1;
    intervalDays = repetition === 1 ? 3 : Math.max(4, Math.round(intervalDays * (easeFactor + 0.15)));
    easeFactor += 0.15;
    consecutiveCorrect += 1;
    nextReviewAt = addDays(now, intervalDays);
  }

  return {
    ...base,
    repetition,
    intervalDays,
    easeFactor,
    nextReviewAt: nextReviewAt.toISOString(),
    consecutiveCorrect,
    isWeak: consecutiveCorrect < 2,
    lastReviewedAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
}

export function isReviewDue(review: ReviewState, now = new Date()) {
  return new Date(review.nextReviewAt).getTime() <= now.getTime();
}
