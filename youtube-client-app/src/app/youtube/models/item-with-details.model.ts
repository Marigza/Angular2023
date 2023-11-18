import { Snippet } from './snippet.model';
import { StatisticParameters } from './statistic-parameters.model';

export interface ItemWithDetails {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: StatisticParameters;
}
