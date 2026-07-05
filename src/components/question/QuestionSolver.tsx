import { BookmarkPlus, Check, ChevronRight, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { applyReviewRating, markWeak, saveAttempt } from '../../db/repository';
import type { GradeResult } from '../../domain/scoring';
import { gradeQuestion } from '../../domain/scoring';
import type { Question, ReviewRating, StudyMode, WrongReason } from '../../domain/question';
import { useLocalSetting } from '../../hooks/useLocalSetting';
import { difficultyLabels } from '../../utils/questionLabels';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Select, TextArea } from '../ui/Field';
import { QuestionMeta } from './QuestionMeta';
import { TraceTable } from './TraceTable';

interface QuestionSolverProps {
  questions: Question[];
  mode: StudyMode;
  title?: string;
  strictCodeOutput?: boolean;
  onAnswered?: () => void;
}

const wrongReasons: WrongReason[] = ['몰랐음', '헷갈림', '실수', '암기 부족', '시간 부족'];

function isTypingTarget(target: EventTarget | null) {
  const element = target as HTMLElement | null;
  return element?.tagName === 'INPUT' || element?.tagName === 'TEXTAREA' || element?.tagName === 'SELECT';
}

export function QuestionSolver({ questions, mode, title = '문제 풀이', strictCodeOutput = false, onAnswered }: QuestionSolverProps) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<GradeResult | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongReason, setWrongReason] = useState<WrongReason>('헷갈림');
  const [note, setNote] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [strictMode, setStrictMode] = useLocalSetting('gisa-lab-strict-code-output', strictCodeOutput);

  const question = questions[index];
  const progress = useMemo(() => `${Math.min(index + 1, questions.length)} / ${questions.length}`, [index, questions.length]);

  useEffect(() => {
    setIndex(0);
    setAnswer('');
    setResult(null);
    setShowAnswer(false);
  }, [questions]);

  const resetForNext = (nextIndex: number) => {
    setIndex(nextIndex);
    setAnswer('');
    setResult(null);
    setShowAnswer(false);
    setNote('');
    setReviewMessage('');
  };

  const handleNext = () => {
    if (!questions.length) return;
    resetForNext((index + 1) % questions.length);
  };

  const handleCheck = async () => {
    if (!question) return;
    const grade = gradeQuestion(question, answer, { strictCodeOutput: strictMode });
    setResult(grade);
    setShowAnswer(true);
    await saveAttempt({
      questionId: question.id,
      submittedAnswer: answer,
      isCorrect: grade.isCorrect,
      mode,
      answeredAt: new Date().toISOString(),
      wrongReason: grade.isCorrect ? undefined : wrongReason,
      note: grade.isCorrect ? undefined : note,
    });
    if (!grade.isCorrect) {
      await markWeak(question.id);
    }
    onAnswered?.();
  };

  const handleAddWrong = async () => {
    if (!question) return;
    await saveAttempt({
      questionId: question.id,
      submittedAnswer: answer,
      isCorrect: false,
      mode,
      answeredAt: new Date().toISOString(),
      wrongReason,
      note,
    });
    await markWeak(question.id);
    setReviewMessage('오답노트에 추가했습니다.');
    onAnswered?.();
  };

  const handleReview = async (rating: ReviewRating) => {
    if (!question) return;
    const next = await applyReviewRating(question.id, rating);
    setReviewMessage(`다음 복습: ${next.nextReviewAt.slice(0, 10)} (${difficultyLabels[rating]})`);
    onAnswered?.();
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      if (event.key.toLowerCase() === 'n') {
        event.preventDefault();
        handleNext();
      }
      if (event.key.toLowerCase() === 'r') {
        event.preventDefault();
        if (question) {
          void handleCheck();
        }
      }
      if (event.key.toLowerCase() === 'o') {
        event.preventDefault();
        void handleAddWrong();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  if (!questions.length) {
    return (
      <Card title={title}>
        <p className="text-sm text-ink-muted dark:text-slate-400">조건에 맞는 문제가 없습니다.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
      <Card
        title={
          <span className="flex items-center gap-2">
            {title}
            <Badge>{progress}</Badge>
          </span>
        }
        action={
          <Button icon={<ChevronRight className="h-4 w-4" />} onClick={handleNext}>
            다음
          </Button>
        }
      >
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-bold leading-snug text-ink dark:text-white">{question.title}</h1>
            <p className="mt-2 text-sm text-ink-muted dark:text-slate-400">
              {question.chapter} · {question.topic}
            </p>
          </div>
          <QuestionMeta question={question} />
          <p className="whitespace-pre-wrap rounded-2xl bg-surface-muted p-4 text-sm leading-6 text-ink dark:bg-slate-800 dark:text-slate-100">
            {question.prompt}
          </p>
          {question.code && (
            <div className="rounded-2xl bg-code-bg text-code-text">
              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
                <span className="text-xs font-bold text-slate-400">{question.language ?? 'code'}</span>
                <span className="text-xs text-slate-500">실행 없이 추적</span>
              </div>
              <pre className="overflow-x-auto p-5 text-xs leading-5">
                <code>{question.code}</code>
              </pre>
            </div>
          )}
          {question.choices?.length ? (
            <div className="grid gap-2">
              {question.choices.map((choice, choiceIndex) => (
                <button
                  key={choice}
                  className="focus-ring rounded-xl border border-line-subtle bg-surface px-4 py-3 text-left text-sm hover:border-brand-secondary hover:bg-brand-secondaryContainer dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-blue-950"
                  onClick={() => setAnswer(choice)}
                  type="button"
                >
                  {choiceIndex + 1}. {choice}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </Card>

      <Card title="답안 / 해설">
        <div className="space-y-5">
          <TextArea
            placeholder="출력값 또는 답안을 입력하세요."
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
          />
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <Button variant="primary" icon={<Check className="h-4 w-4" />} onClick={handleCheck}>
              정답 확인
            </Button>
            <Button icon={<BookmarkPlus className="h-4 w-4" />} onClick={handleAddWrong}>
              오답 추가
            </Button>
            <Button icon={<RotateCcw className="h-4 w-4" />} onClick={() => setShowAnswer(true)}>
              해설 보기
            </Button>
          </div>
          {(question.type === 'code-output' || question.type === 'sql-result') && (
            <label className="flex items-center gap-2 text-sm text-ink-muted dark:text-slate-300">
              <input
                checked={strictMode}
                className="h-4 w-4 accent-brand-secondary"
                type="checkbox"
                onChange={(event) => setStrictMode(event.target.checked)}
              />
              엄격 채점
            </label>
          )}

          <div className="grid gap-2 sm:grid-cols-2">
            <Select value={wrongReason} onChange={(event) => setWrongReason(event.target.value as WrongReason)}>
              {wrongReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </Select>
            <TextArea
              className="min-h-10 sm:col-span-1"
              placeholder="오답 메모"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </div>

          {result && (
            <div
              className={`rounded-xl border p-4 text-sm ${
                result.isCorrect
                  ? 'border-state-success bg-state-successContainer text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100'
                  : 'border-state-error bg-state-errorContainer text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100'
              }`}
            >
              {result.isCorrect ? '정답입니다.' : '오답입니다.'} {result.reason}
            </div>
          )}

          {showAnswer && (
            <div className="space-y-3">
              <div>
                <p className="text-xs font-bold text-ink-muted dark:text-slate-400">정답</p>
                <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-surface-muted p-4 text-sm dark:bg-slate-800">
                  {question.answer}
                </pre>
              </div>
              <div>
                <p className="text-xs font-bold text-ink-muted dark:text-slate-400">해설</p>
                <p className="mt-2 text-sm leading-6">{question.explanation}</p>
              </div>
              <TraceTable trace={question.trace} />
              <div>
                <p className="mb-2 text-xs font-bold text-ink-muted dark:text-slate-400">간격 반복 난이도</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(Object.keys(difficultyLabels) as ReviewRating[]).map((rating) => (
                    <Button key={rating} onClick={() => void handleReview(rating)}>
                      {difficultyLabels[rating]}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {reviewMessage && <p className="text-sm font-medium text-brand-tertiaryHover dark:text-emerald-300">{reviewMessage}</p>}
        </div>
      </Card>
    </div>
  );
}
