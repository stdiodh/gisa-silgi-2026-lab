import { Download, FileJson, Upload } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { getAllQuestions, getAttempts, getDashboardStats, getWrongAttempts, upsertQuestions } from '../db/repository';
import { parseImportByFilename } from '../domain/importers';
import { downloadJson } from '../utils/download';

export function ImportPage() {
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleFile = async (file: File) => {
    const text = await file.text();
    const result = parseImportByFilename(file.name, text);
    setErrors(result.errors);
    if (result.questions.length > 0) {
      await upsertQuestions(result.questions);
      setMessage(`${result.questions.length}개 문제를 import했습니다.`);
    } else {
      setMessage('가져온 문제가 없습니다.');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-heading">데이터 import/export</h1>
        <p className="page-subtitle">사용자가 로컬에 가진 JSON/CSV/Markdown 파일만 브라우저에서 읽습니다.</p>
      </div>

      <Card title="Import">
        <label className="focus-ring flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface-muted p-10 text-center dark:border-slate-700 dark:bg-slate-800">
          <Upload className="h-8 w-8 text-brand-secondary dark:text-blue-300" />
          <span className="mt-2 text-sm font-medium">JSON, CSV, Markdown 파일 선택</span>
          <input
            accept=".json,.csv,.md,.markdown"
            className="sr-only"
            type="file"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleFile(file);
            }}
          />
        </label>
        {message && <p className="mt-3 text-sm font-medium text-brand-tertiaryHover dark:text-emerald-300">{message}</p>}
        {errors.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm text-red-700 dark:text-red-300">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="Export">
        <div className="grid gap-2 sm:grid-cols-3">
          <Button
            icon={<FileJson className="h-4 w-4" />}
            onClick={async () => downloadJson('gisa-lab-questions.json', { questions: await getAllQuestions() })}
          >
            문제 JSON
          </Button>
          <Button
            icon={<Download className="h-4 w-4" />}
            onClick={async () => downloadJson('gisa-lab-wrong-notes.json', { attempts: await getWrongAttempts() })}
          >
            오답노트 JSON
          </Button>
          <Button
            icon={<Download className="h-4 w-4" />}
            onClick={async () =>
              downloadJson('gisa-lab-study-stats.json', {
                stats: await getDashboardStats(),
                attempts: await getAttempts(),
              })
            }
          >
            학습 통계 JSON
          </Button>
        </div>
      </Card>
    </div>
  );
}
