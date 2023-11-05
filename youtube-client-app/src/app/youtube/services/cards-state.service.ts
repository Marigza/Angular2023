import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';

import { SearchItem } from '../models/search-item.model';
import { FilterByValueService } from './filter-by-value.service';
import { SortingCardsService } from './sorting-cards.service';
import { YoutubeHttpService } from './youtube-http.service';

@Injectable({
  providedIn: 'root',
})
export class CardsStateService {
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
    private youtubeHttpService: YoutubeHttpService,
    private filterByValueService: FilterByValueService,
    private sortingCardsService: SortingCardsService
  ) {}

  public sortData(filteredCards: Observable<SearchItem[] | undefined>): Observable<SearchItem[] | undefined> {
    return combineLatest(filteredCards, this.sortingCardsService.sortingParams$).pipe(
      map(([cards, sortingParam]) => cards && this.sortingCardsService.sortingData(cards, sortingParam))
    );
  }

  public getCards(): void {
    this.youtubeHttpService
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
