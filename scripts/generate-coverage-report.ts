import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { sampleQuestions } from '../src/data/sampleQuestions';
import { calculateScopeCoverage } from '../src/domain/scopeCoverage';

const checklistPath = join(process.cwd(), 'docs/QNET_SCOPE_CHECKLIST.md');
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(new Date());
const rows = calculateScopeCoverage(sampleQuestions);
const failures = rows.filter((row) => row.count < row.area.minimum);
const zeroRows = rows.filter((row) => row.count === 0);
const lowRows = rows.filter((row) => row.count > 0 && row.count < row.area.minimum);

function renderTable() {
  const header = [
    '| 영역 | 최소 기준 | 매칭 키워드 기준 | 커버 문항 수 | 예시 문제 ID | 상태 |',
    '| --- | ---: | --- | ---: | --- | --- |',
  ];
  const body = rows.map((row) => {
    const examples = row.examples.length ? row.examples.join(', ') : '-';
    return `| ${row.area.name} | ${row.area.minimum} | ${row.area.keywords.join(', ')} | ${row.count} | ${examples} | ${row.status} |`;
  });
  return [...header, ...body].join('\n');
}

function renderCandidateList(title: string, items: typeof rows) {
  if (!items.length) return `\n${title}\n\n- 없음`;
  return `\n${title}\n\n${items.map((row) => `- ${row.area.name}: ${row.count}/${row.area.minimum}`).join('\n')}`;
}

const generatedSection = `## Coverage Report

이 영역은 \`npm run coverage:scope\`로 자동 갱신합니다.

기준: \`src/data/sampleQuestions.ts\` export 결과 ${sampleQuestions.length}문항  
산정일: ${today}  
산정 방식: 각 문제의 \`chapter\`, \`topic\`, \`tags\` 텍스트에 영역별 키워드가 포함되는지 확인했습니다. 한 문제가 여러 영역에 중복 집계될 수 있습니다.

${renderTable()}

## 문제 추가 후보
${renderCandidateList('coverage가 0인 영역:', zeroRows)}
${renderCandidateList('최소 기준 미달 영역:', lowRows)}

새 문제를 추가할 때도 기출 원문은 저장하지 않고, 변형 문제만 \`originalIncluded: false\`로 유지합니다.
`;

const current = readFileSync(checklistPath, 'utf8');
const next = current.match(/## Coverage Report/)
  ? current.replace(/## Coverage Report[\s\S]*$/, generatedSection)
  : `${current.trim()}\n\n${generatedSection}`;

writeFileSync(checklistPath, next);

if (failures.length > 0) {
  console.error(`출제범위 coverage 최소 기준 미달:\n${failures.map((row) => `- ${row.area.name}: ${row.count}/${row.area.minimum}`).join('\n')}`);
  process.exit(1);
}

console.log(`출제범위 coverage 검증 통과: ${sampleQuestions.length}문항`);
