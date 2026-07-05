import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QuestionSolver } from '../components/question/QuestionSolver';
import { QuestionMeta } from '../components/question/QuestionMeta';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Select, TextInput } from '../components/ui/Field';
import { chapters } from '../data/chapterMap';
import { filterQuestions } from '../db/repository';
import type { Question, QuestionFilters, QuestionLanguage, QuestionPriority, QuestionType } from '../domain/question';
import { useQuestions } from '../hooks/useRepositoryData';
import { questionTypeLabels } from '../utils/questionLabels';

const languageOptions: Array<QuestionLanguage | 'all'> = ['all', 'C', 'Java', 'Python', 'SQL'];
const priorityOptions: Array<QuestionPriority | 'all'> = ['all', 'A', 'B', 'C'];
const typeOptions: Array<QuestionType | 'all'> = [
  'all',
  'short-answer',
  'multiple-choice',
  'fill-blank',
  'code-output',
  'sql-result',
  'term-matching',
  'keyword-check',
];

export function QuestionsPage() {
  const [searchParams] = useSearchParams();
  const { questions, loading, refresh } = useQuestions();
  const [filters, setFilters] = useState<QuestionFilters>({
    keyword: searchParams.get('q') ?? '',
    chapter: 'all',
    tag: 'all',
    language: 'all',
    type: 'all',
    priority: 'all',
    trend2026Round1: 'all',
  });
  const [filtered, setFiltered] = useState<Question[]>([]);
  const [selected, setSelected] = useState<Question | null>(null);
  const tags = useMemo(() => [...new Set(questions.flatMap((question) => question.tags))].sort(), [questions]);

  useEffect(() => {
    setFilters((previous) => ({ ...previous, keyword: searchParams.get('q') ?? previous.keyword }));
  }, [searchParams]);

  useEffect(() => {
    void filterQuestions(filters).then((next) => {
      setFiltered(next);
      setSelected((current) => (current && next.some((question) => question.id === current.id) ? current : next[0] ?? null));
    });
  }, [filters, questions]);

  if (loading) return <Card title="문제은행">문제를 불러오는 중입니다.</Card>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-heading">문제은행</h1>
        <p className="page-subtitle">키워드, 장, 태그, 언어, 유형, 중요도, 오답/복습 조건으로 필터링합니다.</p>
      </div>

      <Card title="검색 / 필터">
        <div className="grid gap-3 md:grid-cols-4">
          <label className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <TextInput
              className="pl-9"
              placeholder="키워드 검색"
              value={filters.keyword ?? ''}
              onChange={(event) => setFilters((prev) => ({ ...prev, keyword: event.target.value }))}
            />
          </label>
          <Select value={filters.chapter} onChange={(event) => setFilters((prev) => ({ ...prev, chapter: event.target.value }))}>
            <option value="all">전체 장</option>
            {chapters.map((chapter) => (
              <option key={chapter} value={chapter}>
                {chapter}
              </option>
            ))}
          </Select>
          <Select value={filters.tag} onChange={(event) => setFilters((prev) => ({ ...prev, tag: event.target.value }))}>
            <option value="all">전체 태그</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Select>
          <Select value={filters.language} onChange={(event) => setFilters((prev) => ({ ...prev, language: event.target.value as QuestionLanguage | 'all' }))}>
            {languageOptions.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? '전체 언어' : item}
              </option>
            ))}
          </Select>
          <Select value={filters.type} onChange={(event) => setFilters((prev) => ({ ...prev, type: event.target.value as QuestionType | 'all' }))}>
            {typeOptions.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? '전체 유형' : questionTypeLabels[item]}
              </option>
            ))}
          </Select>
          <Select value={filters.priority} onChange={(event) => setFilters((prev) => ({ ...prev, priority: event.target.value as QuestionPriority | 'all' }))}>
            {priorityOptions.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? '전체 중요도' : item}
              </option>
            ))}
          </Select>
          <Select
            value={String(filters.trend2026Round1)}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                trend2026Round1: event.target.value === 'all' ? 'all' : event.target.value === 'true',
              }))
            }
          >
            <option value="all">경향 전체</option>
            <option value="true">2026 1회 경향</option>
            <option value="false">일반</option>
          </Select>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            variant={filters.wrongOnly ? 'primary' : 'secondary'}
            onClick={() => setFilters((prev) => ({ ...prev, wrongOnly: !prev.wrongOnly }))}
          >
            오답 여부
          </Button>
          <Button
            variant={filters.dueOnly ? 'primary' : 'secondary'}
            onClick={() => setFilters((prev) => ({ ...prev, dueOnly: !prev.dueOnly }))}
          >
            복습 예정
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="space-y-2">
          <p className="text-sm font-medium text-ink-muted dark:text-slate-400">검색 결과 {filtered.length}개</p>
          {filtered.map((question) => (
            <button
              key={question.id}
              className={`focus-ring w-full rounded-2xl border p-4 text-left transition ${
                selected?.id === question.id
                  ? 'border-brand-secondary bg-brand-secondaryContainer dark:border-blue-400 dark:bg-blue-950'
                  : 'border-line-subtle bg-surface hover:bg-surface-muted dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800'
              }`}
              onClick={() => setSelected(question)}
              type="button"
            >
              <p className="font-medium">{question.title}</p>
              <p className="mt-1 text-xs text-ink-muted dark:text-slate-400">{question.topic}</p>
              <div className="mt-2">
                <QuestionMeta question={question} />
              </div>
            </button>
          ))}
        </div>
        <QuestionSolver questions={selected ? [selected] : []} mode="quiz" title="선택 문제 풀이" onAnswered={refresh} />
      </div>
    </div>
  );
}
