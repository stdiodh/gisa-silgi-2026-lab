export type SourceKind = 'official' | 'publisher' | 'restored' | 'review' | 'user-local';
export type SourceConfidence = 'high' | 'medium' | 'low';

export interface TrendSource {
  id: string;
  kind: SourceKind;
  title: string;
  year: number;
  round?: 1 | 2 | 3;
  publishedAt?: string;
  checkedAt: string;
  confidence: SourceConfidence;
  note: string;
}

export interface TrendSignal {
  id: string;
  sourceIds: string[];
  yearRange: string;
  category:
    | 'C'
    | 'Java'
    | 'Python'
    | 'SQL'
    | 'DB'
    | 'Security'
    | 'Network'
    | 'Testing'
    | 'DesignPattern'
    | 'SoftwareEngineering'
    | 'OS'
    | 'DataStructure';
  topics: string[];
  suggestedWeight: number;
  confidence: SourceConfidence;
  rationale: string;
}
