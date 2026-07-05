import { useCallback, useEffect, useState } from 'react';
import type { Question } from '../domain/question';
import { getAllQuestions, seedSampleQuestions } from '../db/repository';

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    await seedSampleQuestions();
    const next = await getAllQuestions();
    setQuestions(next);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { questions, loading, refresh };
}
