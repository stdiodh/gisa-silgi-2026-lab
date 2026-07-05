import { useMemo } from 'react';
import { QuestionSolver } from '../components/question/QuestionSolver';
import { Card } from '../components/ui/Card';
import { useQuestions } from '../hooks/useRepositoryData';

export function QuizPage() {
  const { questions, loading, refresh } = useQuestions();
  const quizQuestions = useMemo(() => [...questions].sort((a, b) => a.id.localeCompare(b.id)).slice(0, 20), [questions]);

  if (loading) return <Card title="일반 퀴즈">문제를 불러오는 중입니다.</Card>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-heading">일반 퀴즈</h1>
        <p className="page-subtitle">샘플 문제은행에서 20문항을 순서대로 풉니다.</p>
      </div>
      <QuestionSolver questions={quizQuestions} mode="quiz" title="일반 퀴즈" onAnswered={refresh} />
    </div>
  );
}
