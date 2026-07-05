export interface TrendWeight {
  category: string;
  weight: number;
  topics: string[];
}

export const trend2026Round1Weights: TrendWeight[] = [
  {
    category: '프로그래밍 언어 활용',
    weight: 40,
    topics: [
      'C 포인터/배열/구조체/연산자',
      'Java 클래스/상속/오버라이딩/static',
      'Python 슬라이싱/얕은 복사/range/dict/set',
    ],
  },
  {
    category: 'SQL 응용',
    weight: 15,
    topics: ['JOIN', 'GROUP BY', 'HAVING', '서브쿼리', 'DDL/DML/DCL'],
  },
  {
    category: '데이터베이스/자료구조',
    weight: 15,
    topics: ['DB 설계 순서', '정규화', '키', '무결성', '트랜잭션'],
  },
  {
    category: '보안/네트워크',
    weight: 15,
    topics: ['Watering Hole', 'SQL Injection', 'VPN', '서브넷', 'OSI/TCP-IP'],
  },
  {
    category: '소프트웨어 공학/테스트/패턴',
    weight: 15,
    topics: ['디자인 패턴', '테스트 기법', '애자일', '요구사항', '결합도/응집도'],
  },
];
