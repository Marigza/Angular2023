import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';

import { SearchItem } from '../models/search-item.model';
import { DataHttpService } from './data-http.service';
import { FilterByValueService } from './filter-by-value.service';
import { SortingService } from './sorting.service';

@Injectable({
  providedIn: 'root',
})
export class DataFromHttpService {
  private card$$ = new BehaviorSubject<SearchItem[] | null>(null);

  public card$ = this.card$$.asObservable();

  public filteredCards$: Observable<SearchItem[] | undefined> = this.filterByValueService.filterParameter$.pipe(
    switchMap(value => {
      const filteredCards = this.card$.pipe(
        map(cards => cards?.filter(card => card.snippet.title.toLowerCase().includes(value.toLowerCase())))
      );

      return this.sortData(filteredCards);
    })
  );

  constructor(
    private dataHttpService: DataHttpService,
    private filterByValueService: FilterByValueService,
    private sortingService: SortingService
  ) {}

  public sortData(filteredCards: Observable<SearchItem[] | undefined>): Observable<SearchItem[] | undefined> {
    return combineLatest(filteredCards, this.sortingService.sortingParams$).pipe(
      map(([cards, sortingParam]) => cards && this.sortingService.sortingData(cards, sortingParam))
    );
  }

  public getCards(): void {
    this.dataHttpService
      .get()
      .pipe(map(({ items }) => items))
      .subscribe(data => {
        this.updateData(data);
      });
  }

  public getFilteredValue(): void {
    this.filterByValueService.updateData('');
  }

  private updateData(data: SearchItem[]): void {
    this.card$$.next(data);
  }
}
