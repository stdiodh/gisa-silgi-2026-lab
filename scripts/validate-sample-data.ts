import { sampleQuestions } from '../src/data/sampleQuestions';
import { trendSignalIds } from '../src/data/trendSignals';
import { validateQuestion } from '../src/domain/importers';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const errors: string[] = [];
const warnings: string[] = [];
const blockedExtensions = new Set(['.pdf', '.zip', '.7z', '.rar', '.db', '.sqlite']);

function walkFiles(dir: string, ignored = new Set(['.git', 'node_modules', 'dist'])) {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (ignored.has(entry)) continue;
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) files.push(...walkFiles(path, ignored));
    else files.push(path);
  }
  return files;
}

for (const file of walkFiles(process.cwd())) {
  const lower = file.toLowerCase();
  if ([...blockedExtensions].some((extension) => lower.endsWith(extension))) {
    errors.push(`저장소에 포함할 수 없는 파일이 있습니다: ${file}`);
  }
}

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

  if ((question as { originalIncluded?: boolean }).originalIncluded === true) {
    errors.push(`${question.id}: originalIncluded는 true일 수 없습니다.`);
  }
  if (!question.answer?.trim()) {
    errors.push(`${question.id}: answer가 비어 있습니다.`);
  }
  if (!question.explanation?.trim()) {
    errors.push(`${question.id}: explanation이 비어 있습니다.`);
  }
  if (question.type === 'code-output' && (!question.trace || question.trace.length < 2)) {
    errors.push(`${question.id}: code-output 문제는 trace가 최소 2단계 이상 필요합니다.`);
  }
  if (question.type === 'sql-result' && !question.tableAnswer && !question.answer?.trim()) {
    errors.push(`${question.id}: SQL 결과 문제는 tableAnswer 또는 answer가 필요합니다.`);
  }
  if (question.sourceConfidence === 'low' && question.priority === 'A') {
    warnings.push(`${question.id}: low confidence 문제인데 priority A입니다.`);
  }
  if (question.sourceYear && (!question.sourceKind || !question.sourceConfidence)) {
    errors.push(`${question.id}: 최근 3년 모드 문제는 sourceYear/sourceKind/sourceConfidence가 필요합니다.`);
  }
  for (const signalId of question.derivedFromTrendSignalIds ?? []) {
    if (!trendSignalIds.has(signalId)) {
      errors.push(`${question.id}: 존재하지 않는 trend signal id입니다. (${signalId})`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn(warnings.join('\n'));
}

console.log(`샘플 데이터 검증 통과: ${sampleQuestions.length}개`);
