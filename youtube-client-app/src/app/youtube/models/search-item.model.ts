import { Snippet } from './snippet.model';
import { StatisticParameters } from './statistic-parameters.model';

export interface SearchItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: Snippet;
  statistics: StatisticParameters;
}
