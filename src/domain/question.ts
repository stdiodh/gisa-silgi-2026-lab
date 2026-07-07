export type QuestionType =
  | 'short-answer'
  | 'multiple-choice'
  | 'fill-blank'
  | 'code-output'
  | 'sql-result'
  | 'term-matching'
  | 'keyword-check';

export type QuestionPriority = 'A' | 'B' | 'C';
export type QuestionLanguage = 'C' | 'Java' | 'Python' | 'SQL';
export type TraceValue = string | number | boolean | null | Array<string | number | boolean | null>;

export interface TraceStep {
  step: number;
  line: string;
  variableChanges: Record<string, TraceValue>;
  outputSoFar: string;
  note: string;
}

export interface SqlResultTable {
  columns: string[];
  rows: Array<Array<string | number | null>>;
}

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  chapter: string;
  topic: string;
  tags: string[];
  priority: QuestionPriority;
  trend2026Round1: boolean;
  language?: QuestionLanguage;
  prompt: string;
  code?: string;
  choices?: string[];
  answer: string;
  aliases?: string[];
  explanation: string;
  trace?: TraceStep[];
  tableAnswer?: SqlResultTable;
  sourceNote: string;
  sourceYear?: number;
  sourceRound?: string;
  sourceKind?: SourceKind;
  sourceConfidence?: SourceConfidence;
  sourceUrl?: string;
  derivedFromTrendSignalIds?: string[];
  originalIncluded?: false;
  createdAt: string;
  updatedAt: string;
}

export type WrongReason =
  | '몰랐음'
  | '헷갈림'
  | '실수'
  | '암기 부족'
  | '시간 부족';

export type WrongPattern =
  | '출력 형식 실수'
  | '변수 추적 누락'
  | '포인터/참조 오해'
  | 'Java 동적 바인딩 오해'
  | 'Python 얕은 복사 오해'
  | 'SQL GROUP BY/HAVING 오해'
  | '용어 혼동'
  | '암기 부족';

export type StudyMode =
  | 'daily'
  | 'quiz'
  | 'trend-2026-1'
  | 'recent-3-years'
  | 'mock'
  | 'wrong'
  | 'review';

export interface Attempt {
  id?: number;
  questionId: string;
  submittedAnswer: string;
  isCorrect: boolean;
  mode: StudyMode;
  answeredAt: string;
  elapsedMs?: number;
  wrongReason?: WrongReason;
  wrongPattern?: WrongPattern;
  note?: string;
  difficulty?: ReviewRating;
}

export interface WrongAnalysis {
  questionId: string;
  wrongReason: WrongReason;
  wrongPattern: WrongPattern;
  retryCount: number;
  lastWrongAt: string;
  resolvedAt?: string;
  mustReviewBeforeExam: boolean;
  updatedAt: string;
}

export interface UserTraceStep {
  id?: number;
  questionId: string;
  attemptId?: number;
  step: number;
  line?: string;
  variableSnapshot: Record<string, string | number | boolean | null>;
  outputSoFar: string;
  note: string;
}

export interface DailyMission {
  date: string;
  dday: number;
  title: string;
  focus: string[];
  questionIds: string[];
  requiredCodeTraceCount: number;
  requiredWrongReviewCount: number;
  completedAt?: string;
  score?: number;
  total?: number;
  weakTagsAfterSession?: string[];
  createdAt: string;
  updatedAt: string;
}

export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

export interface ReviewState {
  questionId: string;
  repetition: number;
  intervalDays: number;
  easeFactor: number;
  nextReviewAt: string;
  consecutiveCorrect: number;
  isWeak: boolean;
  lastReviewedAt?: string;
  updatedAt: string;
}

export interface StudySession {
  id?: number;
  mode: StudyMode;
  startedAt: string;
  endedAt?: string;
  questionIds: string[];
  correctCount: number;
  totalCount: number;
}

export interface MockExamResult {
  id?: number;
  startedAt: string;
  endedAt: string;
  trend2026Round1: boolean;
  questionIds: string[];
  answers: Record<string, string>;
  score: number;
  total: number;
  status: '합격권' | '위험' | '재학습 필요';
  sectionScores: Record<string, { correct: number; total: number }>;
}

export interface QuestionFilters {
  keyword?: string;
  chapter?: string;
  tag?: string;
  language?: QuestionLanguage | 'all';
  type?: QuestionType | 'all';
  priority?: QuestionPriority | 'all';
  trend2026Round1?: boolean | 'all';
  sourceYear?: number | 'all';
  sourceRound?: string | 'all';
  sourceKind?: SourceKind | 'all';
  sourceConfidence?: SourceConfidence | 'all';
  wrongOnly?: boolean;
  dueOnly?: boolean;
}
import type { SourceConfidence, SourceKind } from './trend';
