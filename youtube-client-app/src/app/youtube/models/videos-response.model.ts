import { ItemWithDetails } from './item-with-details.model';

export interface VideosResponse {
  toDo?: string;
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: ItemWithDetails[];
  regionCode: string;
}
