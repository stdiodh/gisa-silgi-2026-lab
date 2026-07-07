import type { Question } from './question';

export interface ScopeArea {
  name: string;
  keywords: string[];
  minimum: number;
}

export interface ScopeCoverageRow {
  area: ScopeArea;
  count: number;
  examples: string[];
  status: '충족' | '부족';
}

export const scopeAreas: ScopeArea[] = [
  { name: '요구사항 확인', keywords: ['요구사항', '유스케이스', '명세', 'UML', '모델링', 'DFD', 'HIPO'], minimum: 10 },
  { name: '데이터 입출력/DB', keywords: ['데이터베이스', 'DB', '정규화', '후보키', '기본키', '외래키', '트랜잭션', 'ACID', '관계'], minimum: 15 },
  { name: '통합 구현/인터페이스', keywords: ['인터페이스', 'API', '통합', 'JSON', 'XML', 'REST', 'SOAP', 'WSDL', 'EAI', 'AJAX'], minimum: 10 },
  { name: '서버 프로그램 구현', keywords: ['서버', 'MVC', 'Spring', '서비스', '트랜잭션', 'SOLID', 'IPC', '모듈화', '결합도', '응집도'], minimum: 10 },
  { name: '화면 설계', keywords: ['화면', 'UI', 'UX', '와이어프레임', '스토리보드', '프로토타입', '접근성'], minimum: 8 },
  { name: '애플리케이션 테스트', keywords: ['테스트', '경계값', '블랙박스', '화이트박스', '단위테스트', 'xUnit', 'FitNesse', 'Selenium'], minimum: 15 },
  { name: 'SQL 응용', keywords: ['SQL', 'SELECT', 'JOIN', 'GROUP', 'HAVING', 'DML', 'DCL'], minimum: 20 },
  { name: '소프트웨어 개발 보안', keywords: ['보안', '암호', '해시', '인증', '인가', '취약점', 'SQL Injection', 'XSS'], minimum: 20 },
  { name: '프로그래밍 언어 활용', keywords: ['C', 'Java', 'Python', '프로그래밍', '출력예측', '포인터', '상속', '리스트'], minimum: 50 },
  { name: '응용 SW 기초 기술', keywords: ['OS', '운영체제', '네트워크', '스케줄링', '프로세스', 'TCP', 'UDP', 'IP'], minimum: 15 },
  { name: '제품 소프트웨어 패키징', keywords: ['패키징', '릴리즈', '버전', '배포', '제품소프트웨어', 'DRM', 'Gradle', 'Jenkins', 'Maven'], minimum: 10 },
];

function matchesArea(question: Question, area: ScopeArea) {
  const searchableText = [question.chapter, question.topic, ...question.tags].join(' ').toLowerCase();
  return area.keywords.some((keyword) => searchableText.includes(keyword.toLowerCase()));
}

export function calculateScopeCoverage(questions: Question[]): ScopeCoverageRow[] {
  return scopeAreas.map((area) => {
    const matched = questions.filter((question) => matchesArea(question, area));
    return {
      area,
      count: matched.length,
      examples: matched.slice(0, 5).map((question) => question.id),
      status: matched.length >= area.minimum ? '충족' : '부족',
    };
  });
}

export function findScopeCoverageFailures(questions: Question[]) {
  return calculateScopeCoverage(questions)
    .filter((row) => row.count < row.area.minimum)
    .map((row) => `${row.area.name}: ${row.count}/${row.area.minimum}`);
}
