import { sampleQuestions } from '../src/data/sampleQuestions';
import { validateQuestion } from '../src/domain/importers';

const errors: string[] = [];

if (sampleQuestions.length < 30) {
  errors.push(`샘플 문제는 최소 30개여야 합니다. 현재 ${sampleQuestions.length}개입니다.`);
}

const counts = {
  c: sampleQuestions.filter((question) => question.language === 'C' && question.type === 'code-output').length,
  java: sampleQuestions.filter((question) => question.language === 'Java' && question.type === 'code-output').length,
  python: sampleQuestions.filter((question) => question.language === 'Python' && question.type === 'code-output').length,
  sql: sampleQuestions.filter((question) => question.language === 'SQL').length,
  security: sampleQuestions.filter((question) => question.chapter.includes('보안')).length,
  database: sampleQuestions.filter((question) => question.chapter.includes('데이터베이스')).length,
  engineering: sampleQuestions.filter((question) => question.chapter.includes('소프트웨어')).length,
};

if (counts.c < 5) errors.push('C 코드 출력 샘플은 최소 5개가 필요합니다.');
if (counts.java < 5) errors.push('Java 코드 출력 샘플은 최소 5개가 필요합니다.');
if (counts.python < 5) errors.push('Python 코드 출력 샘플은 최소 5개가 필요합니다.');
if (counts.sql < 5) errors.push('SQL 샘플은 최소 5개가 필요합니다.');
if (counts.security < 4) errors.push('보안 샘플은 최소 4개가 필요합니다.');
if (counts.database < 4) errors.push('DB 샘플은 최소 4개가 필요합니다.');
if (counts.engineering < 2) errors.push('패턴/테스트/공학 샘플은 최소 2개가 필요합니다.');

for (const question of sampleQuestions) {
  const result = validateQuestion(question);
  errors.push(...result.errors);
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`샘플 데이터 검증 통과: ${sampleQuestions.length}개`);
