import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SearchItem } from '../models/search-item.model';

type SortingType = 'view' | 'data';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  private sortingParams$$ = new BehaviorSubject<SortingType | ''>('');

  public sortingParams$ = this.sortingParams$$.asObservable();

  private isAscendingDate = true;

  private isAscendingView = true;

  public sortingData(cards: SearchItem[], sortParam: SortingType | ''): SearchItem[] | undefined {
    if (sortParam === '') return cards;

    if (sortParam === 'data') {
      this.isAscendingDate = !this.isAscendingDate;

      return this.isAscendingDate ? this.sortingByDate(cards, -1) : this.sortingByDate(cards, 1);
    }

    this.isAscendingView = !this.isAscendingView;

    return this.isAscendingView ? this.sortingByViewCount(cards, -1) : this.sortingByViewCount(cards, 1);
  }

  /* eslint-disable class-methods-use-this */

  private sortingByDate(cards: SearchItem[], asc: number): SearchItem[] {
    return cards.sort((a, b) => (Date.parse(a.snippet.publishedAt) - Date.parse(b.snippet.publishedAt)) * asc);
  }

  private sortingByViewCount(cards: SearchItem[], asc: number): SearchItem[] {
    return cards.sort((a, b) => (Number(a.statistics.viewCount) - Number(b.statistics.viewCount)) * asc);
  }

  /* eslint-enable class-methods-use-this */

  public updateData(sortingValue: SortingType): void {
    this.sortingParams$$.next(sortingValue);
  }
}
