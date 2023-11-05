import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SearchItem } from '../models/search-item.model';

type SortingType = 'view' | 'data';

interface SortParams {
  sortType: SortingType;
  sortNumber: number;
}

@Injectable({
  providedIn: 'root',
})
export class SortingCardsService {
  private sortingParams$$ = new BehaviorSubject<SortParams>({ sortType: 'view', sortNumber: 1 });

  public sortingParams$ = this.sortingParams$$.asObservable();

  private cardForTransform: SearchItem[] = [];

  public sortingData(cards: SearchItem[], sortParam: SortParams): SearchItem[] {
    if (sortParam.sortType === 'data') {
      this.sortingByDate(cards, sortParam.sortNumber);

      return this.cardForTransform;
    }

    this.sortingByViewCount(cards, sortParam.sortNumber);

    return this.cardForTransform;
  }

  private sortingByDate(cards: SearchItem[], asc: number): void {
    this.cardForTransform = cards.sort(
      (a, b) => (Date.parse(a.snippet.publishedAt) - Date.parse(b.snippet.publishedAt)) * asc
    );
  }

  private sortingByViewCount(cards: SearchItem[], asc: number): void {
    this.cardForTransform = cards.sort(
      (a, b) => (Number(a.statistics.viewCount) - Number(b.statistics.viewCount)) * asc
    );
  }

  public updateData(sortParams: SortParams): void {
    this.sortingParams$$.next(sortParams);
  }
}
