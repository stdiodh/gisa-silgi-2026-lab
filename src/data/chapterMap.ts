export const chapterMap = {
  programming: '10장 프로그래밍 언어 활용',
  sql: 'SQL 응용',
  database: '데이터베이스 구축',
  securityNetwork: '정보보안 및 네트워크',
  engineering: '소프트웨어 공학/테스트/패턴',
} as const;

export const chapters = Object.values(chapterMap);
