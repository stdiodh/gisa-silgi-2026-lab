import type { TraceStep } from '../../domain/question';

interface TraceTableProps {
  trace?: TraceStep[];
}

export function TraceTable({ trace }: TraceTableProps) {
  if (!trace?.length) return null;

  return (
    <div className="overflow-x-auto rounded-2xl border border-line-subtle dark:border-slate-800">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-line-subtle bg-surface-muted text-xs font-bold text-ink-muted dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
          <tr>
            <th className="whitespace-nowrap px-2 py-2">step</th>
            <th className="whitespace-nowrap px-2 py-2">line</th>
            <th className="whitespace-nowrap px-2 py-2">variableChanges</th>
            <th className="whitespace-nowrap px-2 py-2">outputSoFar</th>
            <th className="whitespace-nowrap px-2 py-2">note</th>
          </tr>
        </thead>
        <tbody>
          {trace.map((step) => (
            <tr key={step.step} className="border-b border-line-subtle last:border-0 dark:border-slate-800">
              <td className="px-2 py-2 align-top">{step.step}</td>
              <td className="px-2 py-2 align-top font-mono text-xs">{step.line}</td>
              <td className="px-2 py-2 align-top font-mono text-xs">
                {JSON.stringify(step.variableChanges)}
              </td>
              <td className="whitespace-pre-wrap px-2 py-2 align-top font-mono text-xs">{step.outputSoFar}</td>
              <td className="px-2 py-2 align-top">{step.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
