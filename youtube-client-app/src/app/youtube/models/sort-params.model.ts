export interface SortParams {
  sortType: SortingType;
  sortDirection: number;
}

type SortingType = 'view' | 'data';
