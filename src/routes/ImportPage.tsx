import { AlertTriangle, ClipboardPaste, Download, ExternalLink, FileJson, Link as LinkIcon, Upload } from 'lucide-react';
import { useState } from 'react';
import { Button, buttonClassName } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Select, TextArea, TextInput } from '../components/ui/Field';
import { getAllQuestions, getAttempts, getDashboardStats, getWrongAttempts, upsertQuestions } from '../db/repository';
import { parseImportByFilename } from '../domain/importers';
import { downloadJson } from '../utils/download';

type PasteFormat = 'json' | 'csv' | 'markdown';

const sourcePresets = [
  {
    title: '정처기 감자',
    url: 'https://www.youtube.com/@%EC%A0%95%EC%B2%98%EA%B8%B0%EA%B0%90%EC%9E%90',
  },
  {
    title: 'Q-Net 정보처리기사 출제기준',
    url: 'https://www.q-net.or.kr/crf005.do?id=crf00503&jmCd=1320',
  },
];

function filenameForPaste(format: PasteFormat) {
  return format === 'markdown' ? 'paste.md' : `paste.${format}`;
}

export function ImportPage() {
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [pasteFormat, setPasteFormat] = useState<PasteFormat>('json');
  const [pasteText, setPasteText] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');

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

  const handlePasteImport = async () => {
    const result = parseImportByFilename(filenameForPaste(pasteFormat), pasteText);
    setErrors(result.errors);
    const nextSourceUrl = sourceUrl.trim();
    const questions = nextSourceUrl
      ? result.questions.map((question) => ({ ...question, sourceUrl: question.sourceUrl ?? nextSourceUrl }))
      : result.questions;

    if (questions.length > 0) {
      await upsertQuestions(questions);
      setMessage(`${questions.length}개 문제를 private import했습니다. IndexedDB에만 저장됩니다.`);
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

      <Card title="외부 문제 가져오기 가이드">
        <div className="grid gap-3 md:grid-cols-2">
          {sourcePresets.map((preset) => (
            <div key={preset.url} className="rounded-xl border border-line-subtle bg-surface-muted p-4 dark:border-slate-800 dark:bg-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{preset.title}</p>
                <a className={buttonClassName('ghost', 'min-h-9 px-3')} href={preset.url} rel="noreferrer" target="_blank">
                  <ExternalLink className="h-4 w-4" />
                  열기
                </a>
              </div>
              <p className="mt-2 text-sm leading-6 text-ink-muted dark:text-slate-400">
                문제 원문은 사용자가 직접 확인 후 개인 로컬 import로만 저장합니다.
              </p>
              <Button className="mt-3" icon={<LinkIcon className="h-4 w-4" />} onClick={() => setSourceUrl(preset.url)}>
                sourceUrl 적용
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-ink-muted dark:text-slate-400">
          외부 사이트의 기출 원문은 기본 샘플 데이터나 공개 저장소에 저장하지 않습니다.
        </p>
      </Card>

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
        <div className="mt-6 border-t border-line-subtle pt-5 dark:border-slate-800">
          <div className="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)]">
            <Select value={pasteFormat} onChange={(event) => setPasteFormat(event.target.value as PasteFormat)}>
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="markdown">Markdown</option>
            </Select>
            <TextInput
              placeholder="sourceUrl 메타데이터"
              value={sourceUrl}
              onChange={(event) => setSourceUrl(event.target.value)}
            />
          </div>
          <TextArea
            className="mt-3 min-h-44"
            placeholder="문제 데이터를 붙여넣으세요. 변환 결과는 브라우저 IndexedDB에만 저장됩니다."
            value={pasteText}
            onChange={(event) => setPasteText(event.target.value)}
          />
          <Button className="mt-3" icon={<ClipboardPaste className="h-4 w-4" />} onClick={() => void handlePasteImport()}>
            붙여넣기 import
          </Button>
        </div>
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
        <div className="mb-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>Export 파일에는 private import 문제가 포함될 수 있습니다. 공개 공유 전 출처와 원문 포함 여부를 확인하세요.</p>
        </div>
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
