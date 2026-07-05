import { useEffect, useState } from 'react';
import { QuestionSolver } from '../components/question/QuestionSolver';
import { Card } from '../components/ui/Card';
import { getAllQuestions, getDueReviews } from '../db/repository';
import type { Question } from '../domain/question';
import { useQuestions } from '../hooks/useRepositoryData';

export function ReviewPage() {
  const { loading, refresh } = useQuestions();
  const [dueQuestions, setDueQuestions] = useState<Question[]>([]);

  useEffect(() => {
    void Promise.all([getAllQuestions(), getDueReviews()]).then(([questions, reviews]) => {
      const dueIds = new Set(reviews.map((review) => review.questionId));
      setDueQuestions(questions.filter((question) => dueIds.has(question.id)));
    });
  }, [loading]);

  if (loading) return <Card title="오늘의 복습">문제를 불러오는 중입니다.</Card>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-heading">오늘의 복습</h1>
        <p className="page-subtitle">nextReviewAt이 오늘 이전인 문제만 모았습니다.</p>
      </div>
      <QuestionSolver questions={dueQuestions} mode="review" title="간격 반복 복습" onAnswered={refresh} />
    </div>
  );
}
