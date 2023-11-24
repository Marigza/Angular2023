import { Snippet } from './snippet.model';
import { StatisticParameters } from './statistic-parameters.model';

export interface ItemWithDetails {
  isFavorite?: boolean;
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: StatisticParameters;
}
