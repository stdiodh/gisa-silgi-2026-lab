import Dexie, { type Table } from 'dexie';
import type {
  Attempt,
  DailyMission,
  MockExamResult,
  Question,
  ReviewState,
  StudySession,
  UserTraceStep,
  WrongAnalysis,
} from '../domain/question';

export class GisaLabDatabase extends Dexie {
  questions!: Table<Question, string>;
  attempts!: Table<Attempt, number>;
  reviews!: Table<ReviewState, string>;
  sessions!: Table<StudySession, number>;
  mockResults!: Table<MockExamResult, number>;
  dailyMissions!: Table<DailyMission, string>;
  wrongAnalyses!: Table<WrongAnalysis, string>;
  userTraceSteps!: Table<UserTraceStep, number>;

  constructor() {
    super('gisa-silgi-2026-lab');
    this.version(1).stores({
      questions: 'id, type, chapter, topic, priority, trend2026Round1, language, *tags',
      attempts: '++id, questionId, isCorrect, mode, answeredAt, wrongReason',
      reviews: 'questionId, nextReviewAt, isWeak, updatedAt',
      sessions: '++id, mode, startedAt, endedAt',
      mockResults: '++id, startedAt, trend2026Round1, score, status',
    });
    this.version(2).stores({
      questions:
        'id, type, chapter, topic, priority, trend2026Round1, language, sourceYear, sourceKind, sourceConfidence, *tags',
      attempts: '++id, questionId, isCorrect, mode, answeredAt, wrongReason, wrongPattern',
      reviews: 'questionId, nextReviewAt, isWeak, updatedAt',
      sessions: '++id, mode, startedAt, endedAt',
      mockResults: '++id, startedAt, trend2026Round1, score, status',
      dailyMissions: 'date, dday, completedAt, updatedAt',
      wrongAnalyses: 'questionId, wrongReason, wrongPattern, lastWrongAt, resolvedAt, mustReviewBeforeExam',
      userTraceSteps: '++id, questionId, attemptId, step',
    });
  }
}

export const db = new GisaLabDatabase();
