import Dexie, { type Table } from 'dexie';
import type { Attempt, MockExamResult, Question, ReviewState, StudySession } from '../domain/question';

export class GisaLabDatabase extends Dexie {
  questions!: Table<Question, string>;
  attempts!: Table<Attempt, number>;
  reviews!: Table<ReviewState, string>;
  sessions!: Table<StudySession, number>;
  mockResults!: Table<MockExamResult, number>;

  constructor() {
    super('gisa-silgi-2026-lab');
    this.version(1).stores({
      questions: 'id, type, chapter, topic, priority, trend2026Round1, language, *tags',
      attempts: '++id, questionId, isCorrect, mode, answeredAt, wrongReason',
      reviews: 'questionId, nextReviewAt, isWeak, updatedAt',
      sessions: '++id, mode, startedAt, endedAt',
      mockResults: '++id, startedAt, trend2026Round1, score, status',
    });
  }
}

export const db = new GisaLabDatabase();
