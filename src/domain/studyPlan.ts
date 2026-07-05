import { addDays, differenceInCalendarDays, format, startOfDay } from 'date-fns';

export const EXAM_DATE = '2026-07-19';

export interface StudyPlanItem {
  date: string;
  dday: number;
  title: string;
  focus: string[];
  checklist: string[];
}

export function calculateDday(currentDate = new Date(), examDate = new Date(EXAM_DATE)) {
  return differenceInCalendarDays(startOfDay(examDate), startOfDay(currentDate));
}

export function getPlanForDday(dday: number): Omit<StudyPlanItem, 'date' | 'dday'> {
  if (dday === 0) {
    return {
      title: 'D-Day 체크리스트',
      focus: ['신분증', '수험표', '시간 배분', '실수 방지'],
      checklist: ['암기카드만 훑기', '코드 출력 손계산 루틴 확인', '새 자료 추가 금지'],
    };
  }

  if (dday === 1) {
    return {
      title: '오답노트와 암기카드',
      focus: ['오답노트', '보안 용어', 'DB 절차', '테스트 키워드'],
      checklist: ['연속 오답 태그만 복습', '새 문제보다 기존 오답 우선', '수면 시간 확보'],
    };
  }

  if (dday >= 2 && dday <= 3) {
    return {
      title: '2026 1회 경향 모의고사 반복',
      focus: ['코드 출력', 'SQL', '혼합 모의고사'],
      checklist: ['20문항 제한 시간 풀이', '코드 문제 최소 7문항', '틀린 문제 즉시 오답노트'],
    };
  }

  if (dday >= 4 && dday <= 6) {
    return {
      title: '보안 + 네트워크 + 테스트 집중',
      focus: ['공격 기법', 'VPN/IPsec/SSL', '서브넷', '테스트 설계'],
      checklist: ['용어 정의를 한 문장으로 쓰기', '서브넷 계산 5문항', '테스트 키워드 체크'],
    };
  }

  if (dday >= 7 && dday <= 9) {
    return {
      title: 'SQL + DB 집중',
      focus: ['JOIN', 'GROUP BY', '정규화', '트랜잭션'],
      checklist: ['SQL 결과 예측', 'DB 설계 순서 암기', '키/무결성 비교'],
    };
  }

  if (dday >= 10 && dday <= 14) {
    return {
      title: '10장 프로그래밍 언어 활용 집중',
      focus: ['C', 'Java', 'Python', '출력 추적'],
      checklist: ['코드 출력 15문항', '추적 표 직접 작성', '연산자/슬라이싱/상속 복습'],
    };
  }

  return {
    title: dday > 14 ? '기초 개념 정리' : '시험 후 복기',
    focus: dday > 14 ? ['프로그래밍', 'SQL', 'DB', '보안'] : ['회고', '자료 정리'],
    checklist: dday > 14 ? ['A급 문제 우선 풀이', '오답 원인 기록', '매일 복습 큐 확인'] : ['학습 기록 내보내기'],
  };
}

export function generateStudyPlan(currentDate = new Date(), examDate = new Date(EXAM_DATE)) {
  const dday = calculateDday(currentDate, examDate);
  const days = Math.max(0, dday);

  return Array.from({ length: days + 1 }, (_, index) => {
    const date = addDays(startOfDay(currentDate), index);
    const itemDday = calculateDday(date, examDate);
    const plan = getPlanForDday(itemDday);

    return {
      date: format(date, 'yyyy-MM-dd'),
      dday: itemDday,
      ...plan,
    };
  });
}
