import { beforeEach, describe, expect, it } from 'vitest';
import { sampleQuestions } from '../../data/sampleQuestions';
import {
  applyReviewRating,
  getLocalDataCounts,
  getOrCreateDailyMission,
  recordWrongAnalysis,
  resetLocalData,
  resetStudyProgress,
  saveAttempt,
  saveMockResult,
  saveStudySession,
  saveUserTraceSteps,
  upsertQuestions,
} from '../../db/repository';
import { db } from '../../db/schema';

describe('local data reset', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
    await resetLocalData();
  });

  it('학습 기록 초기화는 문제은행을 유지하고 풀이/오답/복습 기록만 삭제한다', async () => {
    const importedQuestion = {
      ...sampleQuestions[0],
      id: 'imported-reset-test-001',
      title: '사용자 import 보존 확인',
    };
    await upsertQuestions([importedQuestion]);

    const attemptId = await saveAttempt({
      questionId: importedQuestion.id,
      submittedAnswer: 'wrong',
      isCorrect: false,
      mode: 'quiz',
      answeredAt: '2026-07-08T00:00:00.000Z',
      wrongReason: '헷갈림',
      wrongPattern: '변수 추적 누락',
    });
    await saveUserTraceSteps([
      {
        questionId: importedQuestion.id,
        attemptId,
        step: 1,
        line: 'printf',
        variableSnapshot: { sum: 1 },
        outputSoFar: '1',
        note: '테스트 trace',
      },
    ]);
    await applyReviewRating(importedQuestion.id, 'again', new Date('2026-07-08T00:00:00.000Z'));
    await recordWrongAnalysis(importedQuestion.id, '헷갈림', '변수 추적 누락', new Date('2026-07-08T00:00:00.000Z'));
    await getOrCreateDailyMission(new Date('2026-07-08T09:00:00+09:00'));
    await saveStudySession({
      mode: 'quiz',
      startedAt: '2026-07-08T00:00:00.000Z',
      questionIds: [importedQuestion.id],
      correctCount: 0,
      totalCount: 1,
    });
    await saveMockResult({
      startedAt: '2026-07-08T00:00:00.000Z',
      endedAt: '2026-07-08T00:30:00.000Z',
      trend2026Round1: false,
      questionIds: [importedQuestion.id],
      answers: { [importedQuestion.id]: 'wrong' },
      score: 0,
      total: 5,
      status: '재학습 필요',
      sectionScores: { C: { correct: 0, total: 1 } },
    });

    await resetStudyProgress();

    const counts = await getLocalDataCounts();
    expect(await db.questions.get(importedQuestion.id)).toBeDefined();
    expect(counts.questions).toBe(sampleQuestions.length + 1);
    expect(counts.attempts).toBe(0);
    expect(counts.reviews).toBe(0);
    expect(counts.sessions).toBe(0);
    expect(counts.mockResults).toBe(0);
    expect(counts.dailyMissions).toBe(0);
    expect(counts.wrongAnalyses).toBe(0);
    expect(counts.userTraceSteps).toBe(0);
  });

  it('전체 로컬 DB 초기화는 import 문제를 지우고 샘플만 다시 생성한다', async () => {
    await upsertQuestions([{ ...sampleQuestions[0], id: 'imported-reset-test-002' }]);

    await resetLocalData();

    expect(await db.questions.get('imported-reset-test-002')).toBeUndefined();
    expect((await getLocalDataCounts()).questions).toBe(sampleQuestions.length);
  });
});
