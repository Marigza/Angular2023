import { SearchItem } from './search-item.model';

export interface SearchResponse {
  toDo?: string;
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: SearchItem[];
  regionCode: string;
}
