import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SearchItem } from '../models/search-item.model';
import { SortParams } from '../models/sort-params.model';

@Injectable({
  providedIn: 'root',
})
export class SortingCardsService {
  private sortingParams$$ = new BehaviorSubject<SortParams>({
    sortType: 'view',
    sortDirection: 1,
  });

  public sortingParams$ = this.sortingParams$$.asObservable();

  private cardsForTransform: SearchItem[] = [];

  public sortingData(cards: SearchItem[], sortParam: SortParams): SearchItem[] {
    if (sortParam.sortType === 'data') {
      this.sortingByDate(cards, sortParam.sortDirection);

      return this.cardsForTransform;
    }

    this.sortingByViewCount(cards, sortParam.sortDirection);

    return this.cardsForTransform;
  }

  private sortingByDate(cards: SearchItem[], direction: number): void {
    this.cardsForTransform = cards.sort(
      (a, b) => (Date.parse(a.snippet.publishedAt) - Date.parse(b.snippet.publishedAt)) * direction
    );
  }

  private sortingByViewCount(cards: SearchItem[], direction: number): void {
    this.cardsForTransform = cards.sort(
      (a, b) => (Number(a.statistics.viewCount) - Number(b.statistics.viewCount)) * direction
    );
  }

  public updateData(sortParams: SortParams): void {
    this.sortingParams$$.next(sortParams);
  }
}
