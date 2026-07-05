import { Badge } from '../ui/Badge';
import type { Question } from '../../domain/question';
import { questionTypeLabels } from '../../utils/questionLabels';

export function QuestionMeta({ question }: { question: Question }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge tone={question.priority === 'A' ? 'red' : question.priority === 'B' ? 'amber' : 'default'}>
        {question.priority}
      </Badge>
      <Badge tone="blue">{questionTypeLabels[question.type]}</Badge>
      {question.language && <Badge>{question.language}</Badge>}
      {question.trend2026Round1 && <Badge tone="green">2026 1회</Badge>}
      {question.tags.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  );
}
