import { describe, expect, it } from 'vitest';
import { calculateDday, generateFixedExamPlan, generateStudyPlan, getPlanForDday } from '../studyPlan';

describe('studyPlan', () => {
  it('D-day를 날짜 단위로 계산한다', () => {
    expect(calculateDday(new Date('2026-07-05T12:00:00+09:00'), new Date('2026-07-19T00:00:00+09:00'))).toBe(14);
  });

  it('D-14는 프로그래밍 집중 플랜이다', () => {
    expect(getPlanForDday(14).title).toContain('프로그래밍');
  });

  it('오늘부터 시험일까지 플랜을 생성한다', () => {
    const plan = generateStudyPlan(new Date('2026-07-18T00:00:00+09:00'), new Date('2026-07-19T00:00:00+09:00'));
    expect(plan.map((item) => item.dday)).toEqual([1, 0]);
  });

  it('2026-07-06부터 2026-07-19까지 고정 플랜을 생성한다', () => {
    const plan = generateFixedExamPlan();
    expect(plan[0].date).toBe('2026-07-06');
    expect(plan.at(-1)?.date).toBe('2026-07-19');
    expect(plan).toHaveLength(14);
  });
});
