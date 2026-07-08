import { BookmarkPlus, Check, ChevronRight, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { applyReviewRating, markWeak, recordWrongAnalysis, saveAttempt, saveUserTraceSteps } from '../../db/repository';
import { nextChecksFor, parseExplanation } from '../../domain/explanation';
import type { GradeResult } from '../../domain/scoring';
import { gradeQuestion } from '../../domain/scoring';
import type { Question, ReviewRating, StudyMode, UserTraceStep, WrongPattern, WrongReason } from '../../domain/question';
import { useLocalSetting } from '../../hooks/useLocalSetting';
import { difficultyLabels } from '../../utils/questionLabels';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Select, TextArea } from '../ui/Field';
import { QuestionMeta } from './QuestionMeta';
import { TracePad } from './TracePad';
import { TraceTable } from './TraceTable';

interface QuestionSolverProps {
  questions: Question[];
  mode: StudyMode;
  title?: string;
  strictCodeOutput?: boolean;
  onAnswered?: () => void;
}

const wrongReasons: WrongReason[] = ['몰랐음', '헷갈림', '실수', '암기 부족', '시간 부족'];
const wrongPatterns: WrongPattern[] = [
  '출력 형식 실수',
  '변수 추적 누락',
  '포인터/참조 오해',
  'Java 동적 바인딩 오해',
  'Python 얕은 복사 오해',
  'SQL GROUP BY/HAVING 오해',
  '용어 혼동',
  '암기 부족',
];

function isTypingTarget(target: EventTarget | null) {
  const element = target as HTMLElement | null;
  return element?.tagName === 'INPUT' || element?.tagName === 'TEXTAREA' || element?.tagName === 'SELECT';
}

function inferWrongPattern(question: Question, fallback: WrongPattern): WrongPattern {
  if (question.language === 'C' && question.tags.some((tag) => tag.includes('포인터') || tag.includes('참조'))) {
    return '포인터/참조 오해';
  }
  if (question.language === 'Java' && question.tags.some((tag) => tag.includes('상속') || tag.includes('오버라이딩'))) {
    return 'Java 동적 바인딩 오해';
  }
  if (question.language === 'Python' && question.tags.some((tag) => tag.includes('얕은') || tag.includes('copy'))) {
    return 'Python 얕은 복사 오해';
  }
  if (question.language === 'SQL' && question.tags.some((tag) => tag.includes('GROUP') || tag.includes('HAVING'))) {
    return 'SQL GROUP BY/HAVING 오해';
  }
  if (question.type === 'code-output') return '변수 추적 누락';
  return fallback;
}

function hasTraceWork(steps: UserTraceStep[], outputBuffer: string) {
  return (
    outputBuffer.trim().length > 0 ||
    steps.some(
      (step) =>
        (step.line?.trim().length ?? 0) > 0 ||
        step.outputSoFar.trim().length > 0 ||
        step.note.trim().length > 0 ||
        Object.keys(step.variableSnapshot).length > 0,
    )
  );
}

export function QuestionSolver({ questions, mode, title = '문제 풀이', strictCodeOutput = false, onAnswered }: QuestionSolverProps) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<GradeResult | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongReason, setWrongReason] = useState<WrongReason>('헷갈림');
  const [wrongPattern, setWrongPattern] = useState<WrongPattern>('변수 추적 누락');
  const [note, setNote] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [strictMode, setStrictMode] = useLocalSetting('gisa-lab-strict-code-output', strictCodeOutput);
  const [traceSteps, setTraceSteps] = useState<UserTraceStep[]>([]);
  const [outputBuffer, setOutputBuffer] = useState('');

  const question = questions[index];
  const progress = useMemo(() => `${Math.min(index + 1, questions.length)} / ${questions.length}`, [index, questions.length]);

  useEffect(() => {
    setIndex(0);
    setAnswer('');
    setResult(null);
    setShowAnswer(false);
    setTraceSteps([]);
    setOutputBuffer('');
  }, [questions]);

  const resetForNext = (nextIndex: number) => {
    setIndex(nextIndex);
    setAnswer('');
    setResult(null);
    setShowAnswer(false);
    setNote('');
    setReviewMessage('');
    setTraceSteps([]);
    setOutputBuffer('');
  };

  const handleNext = () => {
    if (!questions.length) return;
    resetForNext((index + 1) % questions.length);
  };

  const handleCheck = async () => {
    if (!question) return;
    const isTraceQuestion = question.type === 'code-output' || question.type === 'sql-result';
    if (isTraceQuestion && !hasTraceWork(traceSteps, outputBuffer)) {
      setReviewMessage('손코딩 Trace Pad에 한 줄 이상 작성한 뒤 정답을 확인하세요.');
      return;
    }

    const grade = gradeQuestion(question, answer, { strictCodeOutput: strictMode });
    const nextWrongReason: WrongReason = !grade.isCorrect && isTraceQuestion ? '실수' : wrongReason;
    const nextWrongPattern: WrongPattern = inferWrongPattern(question, wrongPattern);
    setResult(grade);
    setShowAnswer(true);
    setReviewMessage('');
    if (!grade.isCorrect && isTraceQuestion) {
      setWrongReason(nextWrongReason);
      setWrongPattern(nextWrongPattern);
    }
    const attemptId = await saveAttempt({
      questionId: question.id,
      submittedAnswer: answer,
      isCorrect: grade.isCorrect,
      mode,
      answeredAt: new Date().toISOString(),
      wrongReason: grade.isCorrect ? undefined : nextWrongReason,
      wrongPattern: grade.isCorrect ? undefined : nextWrongPattern,
      note: grade.isCorrect ? undefined : note,
    });
    await saveUserTraceSteps(
      traceSteps.map((step, stepIndex) => ({
        ...step,
        questionId: question.id,
        attemptId,
        step: stepIndex + 1,
      })),
    );
    if (!grade.isCorrect) {
      await markWeak(question.id);
      await recordWrongAnalysis(question.id, nextWrongReason, nextWrongPattern);
    }
    onAnswered?.();
  };

  const handleAddWrong = async () => {
    if (!question) return;
    const attemptId = await saveAttempt({
      questionId: question.id,
      submittedAnswer: answer,
      isCorrect: false,
      mode,
      answeredAt: new Date().toISOString(),
      wrongReason,
      wrongPattern,
      note,
    });
    await saveUserTraceSteps(
      traceSteps.map((step, stepIndex) => ({
        ...step,
        questionId: question.id,
        attemptId,
        step: stepIndex + 1,
      })),
    );
    await markWeak(question.id);
    await recordWrongAnalysis(question.id, wrongReason, wrongPattern);
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

  const isTraceQuestion = question.type === 'code-output' || question.type === 'sql-result';
  const explanation = parseExplanation(question.explanation);
  const nextChecks = nextChecksFor(question);
  const isTermQuestion = question.type === 'term-matching' || question.type === 'keyword-check';

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
          {isTraceQuestion && (
            <TracePad
              questionId={question.id}
              steps={traceSteps}
              outputBuffer={outputBuffer}
              onChange={setTraceSteps}
              onOutputBufferChange={setOutputBuffer}
            />
          )}
        </div>
      </Card>

      <Card title="답안 / 해설">
        <div className="space-y-5">
          <TextArea
            placeholder={isTraceQuestion ? '손으로 먼저 추적한 뒤 최종 출력값을 입력하세요.' : '답안을 입력하세요.'}
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
            <Button disabled={!result} icon={<RotateCcw className="h-4 w-4" />} onClick={() => setShowAnswer(true)}>
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
            <Select value={wrongPattern} onChange={(event) => setWrongPattern(event.target.value as WrongPattern)}>
              {wrongPatterns.map((pattern) => (
                <option key={pattern} value={pattern}>
                  {pattern}
                </option>
              ))}
            </Select>
            <label className="sm:col-span-2">
              <span className="mb-1 block text-xs font-bold text-ink-muted dark:text-slate-400">
                {isTraceQuestion ? '내가 틀린 추적 지점' : '오답 메모'}
              </span>
              <TextArea
                className="min-h-10"
                placeholder={isTraceQuestion ? '예: i 증가 후 출력 순서를 놓침' : '오답 메모'}
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </label>
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
              <div className="rounded-xl border border-line-subtle p-4 dark:border-slate-800">
                <p className="text-xs font-bold text-ink-muted dark:text-slate-400">정답</p>
                <div className="mt-2 grid gap-3 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold text-ink-muted dark:text-slate-400">내 답</p>
                    <pre className="mt-1 whitespace-pre-wrap rounded-xl bg-surface-muted p-4 text-sm dark:bg-slate-800">
                      {answer || '(빈 답안)'}
                    </pre>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink-muted dark:text-slate-400">정답</p>
                    <pre className="mt-1 whitespace-pre-wrap rounded-xl bg-surface-muted p-4 text-sm dark:bg-slate-800">
                      {question.answer}
                    </pre>
                    {question.aliases?.length ? (
                      <p className="mt-2 text-xs text-ink-muted dark:text-slate-400">허용 답안: {question.aliases.join(', ')}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-line-subtle p-4 dark:border-slate-800">
                <p className="text-xs font-bold text-ink-muted dark:text-slate-400">풀이 포인트</p>
                {explanation.intro && <p className="mt-2 text-sm leading-6">{explanation.intro}</p>}
                <p className="mt-2 text-sm leading-6">{explanation.point}</p>
              </div>
              <div className="rounded-xl border border-line-subtle p-4 dark:border-slate-800">
                <p className="text-xs font-bold text-ink-muted dark:text-slate-400">중요 키워드</p>
                {explanation.keywords && <p className="mt-2 text-sm leading-6">{explanation.keywords}</p>}
                <div className="mt-3 flex flex-wrap gap-1">
                  {question.tags.slice(0, 8).map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                {isTermQuestion && (
                  <p className="mt-3 text-sm leading-6 text-ink-muted dark:text-slate-400">
                    어떤 상황에서 쓰는 용어인지: {explanation.point}
                  </p>
                )}
              </div>
              <div className="rounded-xl border border-line-subtle p-4 dark:border-slate-800">
                <p className="text-xs font-bold text-ink-muted dark:text-slate-400">다음에 같은 유형을 풀 때 체크할 것</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  {nextChecks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              {isTraceQuestion && (
                <div className="grid gap-4 xl:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-bold text-ink-muted dark:text-slate-400">내 trace</p>
                    <TraceTable
                      trace={traceSteps.map((step) => ({
                        step: step.step,
                        line: step.line ?? '',
                        variableChanges: step.variableSnapshot,
                        outputSoFar: step.outputSoFar,
                        note: step.note,
                      }))}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-bold text-ink-muted dark:text-slate-400">해설 trace</p>
                    <TraceTable trace={question.trace} />
                  </div>
                </div>
              )}
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
