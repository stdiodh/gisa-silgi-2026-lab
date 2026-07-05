interface SevenDayChartProps {
  data: Array<{ date: string; count: number }>;
}

export function SevenDayChart({ data }: SevenDayChartProps) {
  const max = Math.max(1, ...data.map((item) => item.count));

  return (
    <div className="flex h-44 items-end gap-3">
      {data.map((item) => (
        <div key={item.date} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-32 w-full items-end rounded-xl bg-surface-muted dark:bg-slate-800">
            <div
              className="w-full rounded-xl bg-brand-secondary"
              style={{ height: `${Math.max(6, (item.count / max) * 100)}%` }}
              title={`${item.date}: ${item.count}`}
            />
          </div>
          <span className="text-[11px] font-medium text-ink-muted dark:text-slate-400">{item.date.slice(5)}</span>
        </div>
      ))}
    </div>
  );
}
