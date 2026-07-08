import type { Question } from './question';

export interface ParsedExplanation {
  intro: string;
  point: string;
  keywords: string;
}

export function parseExplanation(explanation: string): ParsedExplanation {
  const markers = [...explanation.matchAll(/(풀이\s*포인트|키워드)\s*:/g)];
  if (!markers.length) {
    return { intro: '', point: explanation.trim(), keywords: '' };
  }

  const sections = { intro: explanation.slice(0, markers[0].index).trim(), point: '', keywords: '' };
  markers.forEach((marker, index) => {
    const label = marker[1].replace(/\s/g, '');
    const start = (marker.index ?? 0) + marker[0].length;
    const end = markers[index + 1]?.index ?? explanation.length;
    const value = explanation.slice(start, end).trim();
    if (label === '풀이포인트') sections.point = [sections.point, value].filter(Boolean).join(' ');
    if (label === '키워드') sections.keywords = [sections.keywords, value].filter(Boolean).join(' ');
  });

  return {
    ...sections,
    point: sections.point || sections.intro || explanation.trim(),
  };
}

export function nextChecksFor(question: Question) {
  if (question.type === 'code-output') return ['변수 변경 순서', '인덱스/포인터 이동 기준', '최종 출력 형식'];
  if (question.type === 'sql-result' || question.language === 'SQL') return ['JOIN 조건', 'GROUP BY/HAVING 순서', 'NULL과 정렬 조건'];
  if (question.type === 'term-matching' || question.type === 'keyword-check') {
    return ['정의가 쓰이는 상황', '혼동되는 반대 개념', '답안 표기 alias'];
  }
  if (question.type === 'multiple-choice') return ['보기의 핵심 단어', '예외 조건', '오답 보기 제거 근거'];
  return ['요구하는 산출물', '조건 키워드', '답안 표기 형식'];
}
