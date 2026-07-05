import type { QuestionType } from '../domain/question';

export const questionTypeLabels: Record<QuestionType, string> = {
  'short-answer': '단답형',
  'multiple-choice': '객관식',
  'fill-blank': '빈칸 채우기',
  'code-output': '코드 출력 예측',
  'sql-result': 'SQL 결과 예측',
  'term-matching': '용어 매칭',
  'keyword-check': '서술 키워드 체크',
};

export const difficultyLabels = {
  again: '다시',
  hard: '어려움',
  good: '보통',
  easy: '쉬움',
} as const;
