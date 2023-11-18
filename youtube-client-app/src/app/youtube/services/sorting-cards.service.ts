import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ItemWithDetails } from '../models/item-with-details.model';
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

  private cardsForTransform: ItemWithDetails[] = [];

  public sortingData(cards: ItemWithDetails[], sortParam: SortParams): ItemWithDetails[] {
    if (sortParam.sortType === 'data') {
      this.sortingByDate(cards, sortParam.sortDirection);

      return this.cardsForTransform;
    }

    this.sortingByViewCount(cards, sortParam.sortDirection);

    return this.cardsForTransform;
  }

  private sortingByDate(cards: ItemWithDetails[], direction: number): void {
    this.cardsForTransform = cards.sort(
      (a, b) => (Date.parse(a.snippet.publishedAt) - Date.parse(b.snippet.publishedAt)) * direction
    );
  }

  private sortingByViewCount(cards: ItemWithDetails[], direction: number): void {
    this.cardsForTransform = cards.sort(
      (a, b) => (Number(a.statistics.viewCount) - Number(b.statistics.viewCount)) * direction
    );
  }

  public updateData(sortParams: SortParams): void {
    this.sortingParams$$.next(sortParams);
  }
}
