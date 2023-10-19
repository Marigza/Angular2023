import { SearchItem } from './search-item.model';

export interface SearchResponce {
  toDo: string;
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: SearchItem[];
}
