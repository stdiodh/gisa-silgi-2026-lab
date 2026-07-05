import type { Question, QuestionType } from './question';

export interface ScoringOptions {
  caseSensitive?: boolean;
  looseWhitespace?: boolean;
  strictCodeOutput?: boolean;
}

export interface GradeResult {
  isCorrect: boolean;
  expected: string;
  normalizedSubmitted: string;
  normalizedExpected: string;
  matchedAlias?: string;
  reason: string;
}

const whitespaceRegex = /\s+/g;

export function normalizeAnswer(value: string, options: ScoringOptions = {}) {
  const looseWhitespace = options.looseWhitespace ?? true;
  const caseSensitive = options.caseSensitive ?? false;
  let normalized = value.replace(/\r\n/g, '\n').trim();

  if (looseWhitespace) {
    normalized = normalized.replace(whitespaceRegex, ' ');
  }

  if (!caseSensitive) {
    normalized = normalized.toLowerCase();
  }

  return normalized;
}

function normalizeCodeOutput(value: string, options: ScoringOptions = {}) {
  const strict = options.strictCodeOutput ?? false;
  const caseSensitive = options.caseSensitive ?? true;
  let normalized = value.replace(/\r\n/g, '\n').trimEnd();

  if (!strict) {
    normalized = normalized.trim().replace(whitespaceRegex, ' ');
  }

  if (!caseSensitive) {
    normalized = normalized.toLowerCase();
  }

  return normalized;
}

export function formatSqlTableAnswer(question: Question) {
  if (!question.tableAnswer) {
    return question.answer;
  }

  const rows = [
    question.tableAnswer.columns.join('\t'),
    ...question.tableAnswer.rows.map((row) => row.map((cell) => String(cell ?? 'NULL')).join('\t')),
  ];
  return rows.join('\n');
}

function expectedValues(question: Question, type: QuestionType) {
  const primary = type === 'sql-result' && question.tableAnswer ? formatSqlTableAnswer(question) : question.answer;
  return [primary, ...(question.aliases ?? [])];
}

export function gradeQuestion(
  question: Question,
  submittedAnswer: string,
  options: ScoringOptions = {},
): GradeResult {
  const values = expectedValues(question, question.type);
  const isCodeLike = question.type === 'code-output' || question.type === 'sql-result';
  const normalize = isCodeLike
    ? (value: string) => normalizeCodeOutput(value, options)
    : (value: string) => normalizeAnswer(value, options);
  const normalizedSubmitted = normalize(submittedAnswer);

  for (const expected of values) {
    const normalizedExpected = normalize(expected);
    if (normalizedSubmitted === normalizedExpected) {
      return {
        isCorrect: true,
        expected: values[0],
        normalizedSubmitted,
        normalizedExpected,
        matchedAlias: expected === values[0] ? undefined : expected,
        reason: expected === values[0] ? '정답과 일치합니다.' : '허용 답안과 일치합니다.',
      };
    }
  }

  return {
    isCorrect: false,
    expected: values[0],
    normalizedSubmitted,
    normalizedExpected: normalize(values[0]),
    reason: '정답 또는 허용 답안과 일치하지 않습니다.',
  };
}
