import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { sampleQuestions } from '../../../data/sampleQuestions';
import { resetLocalData } from '../../../db/repository';
import { db } from '../../../db/schema';
import { QuestionSolver } from '../QuestionSolver';

const codeQuestion = sampleQuestions.find((question) => question.id === 'sample-c-001');

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
    expect(screen.getByRole('button', { name: /해설 보기/ })).not.toBeDisabled();
  });
});
