export const EXAM_DATE = '2026-07-19';
const kstOffsetMs = 9 * 60 * 60 * 1000;
const dayMs = 24 * 60 * 60 * 1000;

export interface StudyPlanItem {
  date: string;
  dday: number;
  title: string;
  focus: string[];
  checklist: string[];
}

export function toKstDateKey(date: Date) {
  return new Date(date.getTime() + kstOffsetMs).toISOString().slice(0, 10);
}

function dateKeyToUtcMs(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return Date.UTC(year, month - 1, day);
}

function addDaysToDateKey(dateKey: string, amount: number) {
  return new Date(dateKeyToUtcMs(dateKey) + amount * dayMs).toISOString().slice(0, 10);
}

export function diffDateKeys(fromDateKey: string, toDateKey: string) {
  return Math.round((dateKeyToUtcMs(toDateKey) - dateKeyToUtcMs(fromDateKey)) / dayMs);
}

export function calculateDday(currentDate = new Date(), examDate = new Date(EXAM_DATE)) {
  return diffDateKeys(toKstDateKey(currentDate), toKstDateKey(examDate));
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
  const currentDateKey = toKstDateKey(currentDate);
  const examDateKey = toKstDateKey(examDate);
  const dday = diffDateKeys(currentDateKey, examDateKey);
  const days = Math.max(0, dday);

  return Array.from({ length: days + 1 }, (_, index) => {
    const date = addDaysToDateKey(currentDateKey, index);
    const itemDday = diffDateKeys(date, examDateKey);
    const plan = getPlanForDday(itemDday);

    return {
      date,
      dday: itemDday,
      ...plan,
    };
  });
}

export const fixedExamPlan: StudyPlanItem[] = [
  {
    date: '2026-07-06',
    dday: 13,
    title: '진단 모의고사',
    focus: ['진단 모의고사 20문항', '약점 태그 추출', '코드 출력 5문항 필수'],
    checklist: ['20문항 풀이', '약점 태그 확인', '코드 trace 5개 작성'],
  },
  {
    date: '2026-07-07',
    dday: 12,
    title: 'C 집중',
    focus: ['포인터', '배열', '문자열', '구조체', '함수 포인터', '증감 연산자'],
    checklist: ['C 코드 출력 5문항', '포인터가 가리키는 값 표시', '출력 버퍼 따로 기록'],
  },
  {
    date: '2026-07-08',
    dday: 11,
    title: 'Java 집중',
    focus: ['클래스', '생성자', '상속', '오버라이딩', '오버로딩', 'String 결합', 'static'],
    checklist: ['객체 생성 순서 표시', '참조 타입과 실제 타입 분리', 'String 결합 순서 확인'],
  },
  {
    date: '2026-07-09',
    dday: 10,
    title: 'Python 집중',
    focus: ['slicing', 'range', 'list copy', 'dict/set', 'class', 'print end'],
    checklist: ['슬라이싱 인덱스 표시', '얕은 복사 공유 객체 표시', '출력 end 확인'],
  },
  {
    date: '2026-07-10',
    dday: 9,
    title: 'SQL 집중',
    focus: ['JOIN', 'GROUP BY', 'HAVING', 'subquery', 'COUNT/AVG', 'DDL/DML/DCL'],
    checklist: ['중간 테이블 작성', 'GROUP 기준 표시', 'NULL과 COUNT 차이 확인'],
  },
  {
    date: '2026-07-11',
    dday: 8,
    title: 'DB/자료구조 집중',
    focus: ['DB 설계 순서', '정규화', '키', '무결성', '트랜잭션', '관계대수', '트리/그래프'],
    checklist: ['설계 순서 암기', '정규화 단계 비교', '트랜잭션 ACID 재확인'],
  },
  {
    date: '2026-07-12',
    dday: 7,
    title: '보안/네트워크 집중',
    focus: ['Watering Hole', 'SQL Injection', 'VPN', 'IPsec/SSL', 'OSI/TCP-IP', 'subnet'],
    checklist: ['공격 기법 한 문장 정의', '서브넷 계산 5문항', '계층별 프로토콜 정리'],
  },
  {
    date: '2026-07-13',
    dday: 6,
    title: '테스트/패턴/공학 집중',
    focus: ['테스트 커버리지', '블랙박스/화이트박스', 'Stub/Driver', 'GOF 패턴', '응집도/결합도'],
    checklist: ['테스트 용어 비교', '패턴 의도 암기', '결합도/응집도 방향 확인'],
  },
  {
    date: '2026-07-14',
    dday: 5,
    title: '최근 3년 반복 유형 모의고사',
    focus: ['최근 3년 반복 유형', '오답노트 자동 생성', '영역별 점수 확인'],
    checklist: ['recent-3-years 20문항', '오답 원인 기록', '약점 태그 저장'],
  },
  {
    date: '2026-07-15',
    dday: 4,
    title: '코드 출력 10문항 집중',
    focus: ['C 4문항', 'Java 3문항', 'Python 3문항'],
    checklist: ['모든 코드 trace 작성', '정답 전 해설 금지', '출력 형식 확인'],
  },
  {
    date: '2026-07-16',
    dday: 3,
    title: '2026년 1회 경향 모의고사',
    focus: ['코드 출력 최소 7문항', 'SQL 최소 2문항', '복원/후기 기반 경향'],
    checklist: ['경향 모의고사 20문항', '오답 10문항 예약', 'low confidence 과신 금지'],
  },
  {
    date: '2026-07-17',
    dday: 2,
    title: '실전 모의고사 2회',
    focus: ['실전 모의고사', '60점 미만 영역 재학습', '시간 배분'],
    checklist: ['모의고사 2회', '부족 영역 10문항', '실수 패턴 정리'],
  },
  {
    date: '2026-07-18',
    dday: 1,
    title: '최종 오답팩',
    focus: ['오답노트', '암기카드', 'SQL 문법', '보안 용어', '코드 출력 추적표'],
    checklist: ['새 문제 금지', '오답팩 반복', '시험장 루틴 확인'],
  },
  {
    date: '2026-07-19',
    dday: 0,
    title: 'D-Day 체크리스트',
    focus: ['새 문제 풀이 금지', '자주 틀린 답안', '시험장 루틴'],
    checklist: ['신분증/수험표 확인', '자주 틀린 답만 확인', '시간 배분 루틴 유지'],
  },
];

export function getFixedPlanByDate(dateKey: string) {
  return fixedExamPlan.find((item) => item.date === dateKey);
}

export function generateFixedExamPlan() {
  return fixedExamPlan;
}
