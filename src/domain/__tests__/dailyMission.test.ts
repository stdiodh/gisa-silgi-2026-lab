import { beforeEach, describe, expect, it } from 'vitest';
import { sampleQuestions } from '../../data/sampleQuestions';
import { completeDailyMission, getCurrentDailyStreak, getOrCreateDailyMission, resetLocalData } from '../../db/repository';
import { db } from '../../db/schema';
import { buildDailyMission } from '../dailyMission';

describe('daily mission', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
    await resetLocalData();
  });

  it('날짜별로 하나만 생성된다', async () => {
    const now = new Date('2026-07-06T09:00:00+09:00');
    const first = await getOrCreateDailyMission(now);
    const second = await getOrCreateDailyMission(now);

    expect(first.date).toBe('2026-07-06');
    expect(second.date).toBe(first.date);
    expect(await db.dailyMissions.count()).toBe(1);
  });

  it('하루에 두 번 완료해도 완료 기록이 덮어써지지 않는다', async () => {
    const now = new Date('2026-07-06T09:00:00+09:00');
    const mission = await getOrCreateDailyMission(now);
    const first = await completeDailyMission(mission.date, { score: 70, total: 100, weakTagsAfterSession: ['C'] }, now);
    const second = await completeDailyMission(
      mission.date,
      { score: 10, total: 100, weakTagsAfterSession: ['SQL'] },
      new Date('2026-07-06T20:00:00+09:00'),
    );

    expect(second.completedAt).toBe(first.completedAt);
    expect(second.score).toBe(70);
    expect(second.weakTagsAfterSession).toEqual(['C']);
  });

  it('완료 시 streak가 증가한다', async () => {
    await db.dailyMissions.bulkPut([
      {
        date: '2026-07-05',
        dday: 14,
        title: '전날',
        focus: [],
        questionIds: [],
        requiredCodeTraceCount: 0,
        requiredWrongReviewCount: 0,
        completedAt: '2026-07-05T00:00:00.000Z',
        createdAt: '2026-07-05T00:00:00.000Z',
        updatedAt: '2026-07-05T00:00:00.000Z',
      },
      {
        date: '2026-07-06',
        dday: 13,
        title: '오늘',
        focus: [],
        questionIds: [],
        requiredCodeTraceCount: 0,
        requiredWrongReviewCount: 0,
        completedAt: '2026-07-06T00:00:00.000Z',
        createdAt: '2026-07-06T00:00:00.000Z',
        updatedAt: '2026-07-06T00:00:00.000Z',
      },
    ]);

    expect(await getCurrentDailyStreak(new Date('2026-07-06T12:00:00+09:00'))).toBe(2);
  });

  it('D-Day에는 새 문제 대신 체크리스트 미션이 생성된다', () => {
    const mission = buildDailyMission(sampleQuestions, [], new Date('2026-07-19T09:00:00+09:00'));

    expect(mission.dday).toBe(0);
    expect(mission.questionIds).toHaveLength(0);
    expect(mission.title).toContain('D-Day');
  });
});
