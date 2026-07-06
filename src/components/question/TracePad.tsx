import { Copy, Plus, Send } from 'lucide-react';
import type { UserTraceStep } from '../../domain/question';
import { Button } from '../ui/Button';
import { TextArea, TextInput } from '../ui/Field';

interface TracePadProps {
  questionId: string;
  steps: UserTraceStep[];
  onChange: (steps: UserTraceStep[]) => void;
  outputBuffer: string;
  onOutputBufferChange: (value: string) => void;
}

function createStep(questionId: string, step: number, previous?: UserTraceStep): UserTraceStep {
  return {
    questionId,
    step,
    line: '',
    variableSnapshot: previous ? { ...previous.variableSnapshot } : {},
    outputSoFar: previous?.outputSoFar ?? '',
    note: '',
  };
}

function parseSnapshot(value: string) {
  return Object.fromEntries(
    value
      .split(',')
      .map((pair) => pair.trim())
      .filter(Boolean)
      .map((pair) => {
        const [key, rawValue = ''] = pair.split('=').map((item) => item.trim());
        return [key, rawValue];
      }),
  );
}

function formatSnapshot(step: UserTraceStep) {
  return Object.entries(step.variableSnapshot)
    .map(([key, value]) => `${key}=${String(value ?? 'null')}`)
    .join(', ');
}

export function TracePad({ questionId, steps, onChange, outputBuffer, onOutputBufferChange }: TracePadProps) {
  const normalizedSteps = steps.length ? steps : [createStep(questionId, 1)];

  const updateStep = (index: number, patch: Partial<UserTraceStep>) => {
    const next = normalizedSteps.map((step, currentIndex) => (currentIndex === index ? { ...step, ...patch } : step));
    onChange(next);
  };

  const addStep = (copyPrevious = false) => {
    const previous = normalizedSteps.at(-1);
    onChange([...normalizedSteps, createStep(questionId, normalizedSteps.length + 1, copyPrevious ? previous : undefined)]);
  };

  const appendOutput = () => {
    const current = normalizedSteps.at(-1);
    if (!current?.outputSoFar) return;
    onOutputBufferChange(outputBuffer + current.outputSoFar);
  };

  return (
    <section className="rounded-2xl border border-line-subtle bg-surface-muted p-4 dark:border-slate-800 dark:bg-slate-800">
      <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-sm font-bold text-ink dark:text-white">손코딩 Trace Pad</h3>
          <p className="mt-1 text-xs text-ink-muted dark:text-slate-400">정답을 보기 전에 변수 상태와 출력 버퍼를 직접 적습니다.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button icon={<Plus className="h-4 w-4" />} onClick={() => addStep(false)}>
            행 추가
          </Button>
          <Button icon={<Copy className="h-4 w-4" />} onClick={() => addStep(true)}>
            이전 단계 복사
          </Button>
          <Button icon={<Send className="h-4 w-4" />} onClick={appendOutput}>
            출력 버퍼에 추가
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {normalizedSteps.map((step, index) => (
          <div key={step.step} className="grid gap-2 rounded-xl bg-surface p-3 dark:bg-slate-900 md:grid-cols-[80px_1fr_1fr]">
            <TextInput
              aria-label="현재 줄 번호"
              placeholder="line"
              value={step.line ?? ''}
              onChange={(event) => updateStep(index, { line: event.target.value })}
            />
            <TextInput
              aria-label="변수 상태"
              placeholder="i=0, sum=2"
              value={formatSnapshot(step)}
              onChange={(event) => updateStep(index, { variableSnapshot: parseSnapshot(event.target.value) })}
            />
            <TextInput
              aria-label="출력 누적"
              placeholder="outputSoFar"
              value={step.outputSoFar}
              onChange={(event) => updateStep(index, { outputSoFar: event.target.value })}
            />
            <TextArea
              aria-label="메모 근거"
              className="min-h-20 md:col-span-3"
              placeholder="왜 이 값이 되는지 근거를 적으세요."
              value={step.note}
              onChange={(event) => updateStep(index, { note: event.target.value })}
            />
          </div>
        ))}
      </div>

      <div className="mt-3">
        <p className="mb-2 text-xs font-bold text-ink-muted dark:text-slate-400">출력 버퍼</p>
        <TextArea
          className="min-h-20 font-mono"
          placeholder="직접 누적한 출력값"
          value={outputBuffer}
          onChange={(event) => onOutputBufferChange(event.target.value)}
        />
      </div>
    </section>
  );
}
