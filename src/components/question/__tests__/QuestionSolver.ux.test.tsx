import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { sampleQuestions } from '../../../data/sampleQuestions';
import { resetLocalData } from '../../../db/repository';
import { db } from '../../../db/schema';
import type { Question } from '../../../domain/question';
import { QuestionSolver } from '../QuestionSolver';

const codeQuestion = sampleQuestions.find((question) => question.id === 'sample-c-001');
const termQuestion: Question = {
  id: 'ux-term-001',
  title: '용어 상황 확인',
  type: 'term-matching',
  chapter: '요구사항 확인',
  topic: '요구사항',
  tags: ['요구사항', '비기능요구사항'],
  priority: 'A',
  trend2026Round1: false,
  prompt: '성능이나 보안 같은 품질 조건을 뜻하는 요구사항 유형은?',
  answer: '비기능 요구사항',
  explanation: '풀이 포인트: 기능 자체가 아니라 품질 조건을 제한하면 비기능 요구사항이다. 키워드: 품질 조건.',
  sourceNote: '테스트 변형 문제(원문 아님)',
  sourceKind: 'official',
  sourceConfidence: 'high',
  originalIncluded: false,
  createdAt: '2026-07-07T00:00:00.000Z',
  updatedAt: '2026-07-07T00:00:00.000Z',
};

describe('QuestionSolver UX', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
    await resetLocalData();
  });

  it('코드 출력 문제는 trace 없이 정답 확인을 막는다', async () => {
    expect(codeQuestion).toBeDefined();
    render(<QuestionSolver questions={[codeQuestion!]} mode="quiz" />);

    expect(screen.getByRole('button', { name: /해설 보기/ })).toBeDisabled();
    fireEvent.change(screen.getByPlaceholderText(/손으로 먼저 추적/), { target: { value: '8' } });
    fireEvent.click(screen.getByRole('button', { name: /정답 확인/ }));

    expect(await screen.findByText(/Trace Pad에 한 줄 이상 작성/)).toBeInTheDocument();
    expect(screen.queryByText('해설 trace')).not.toBeInTheDocument();
  });

  it('trace 작성 후 정답 확인 시 내 답과 해설 trace를 보여준다', async () => {
    expect(codeQuestion).toBeDefined();
    render(<QuestionSolver questions={[codeQuestion!]} mode="quiz" />);

    fireEvent.change(screen.getByLabelText('현재 줄 번호'), { target: { value: 'printf' } });
    fireEvent.change(screen.getByLabelText('변수 상태'), { target: { value: 'sum=8' } });
    fireEvent.change(screen.getByPlaceholderText(/손으로 먼저 추적/), { target: { value: '8' } });
    fireEvent.click(screen.getByRole('button', { name: /정답 확인/ }));

    expect(await screen.findByText(/정답입니다/)).toBeInTheDocument();
    expect(screen.getByText('내 답')).toBeInTheDocument();
    expect(screen.getByText('해설 trace')).toBeInTheDocument();
    expect(screen.getByText('변수 변경 순서')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /해설 보기/ })).not.toBeDisabled();
    await waitFor(async () => expect(await db.attempts.count()).toBeGreaterThan(0));
  });

  it('term 문제는 중요 키워드와 용어 사용 상황을 보여준다', async () => {
    render(<QuestionSolver questions={[termQuestion]} mode="quiz" />);

    fireEvent.change(screen.getByPlaceholderText('답안을 입력하세요.'), { target: { value: '비기능 요구사항' } });
    fireEvent.click(screen.getByRole('button', { name: /정답 확인/ }));

    expect(await screen.findByText(/정답입니다/)).toBeInTheDocument();
    expect(screen.getByText('중요 키워드')).toBeInTheDocument();
    expect(screen.getByText('품질 조건.')).toBeInTheDocument();
    expect(screen.getByText(/어떤 상황에서 쓰는 용어인지/)).toBeInTheDocument();
    await waitFor(async () => expect(await db.attempts.count()).toBeGreaterThan(0));
  });
});
