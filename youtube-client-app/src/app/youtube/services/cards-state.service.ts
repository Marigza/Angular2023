import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';

import { ItemWithDetails } from '../models/item-with-details.model';
import { FilterByValueService } from './filter-by-value.service';
import { SortingCardsService } from './sorting-cards.service';
import { YoutubeHttpService } from './youtube-http.service';

@Injectable({
  providedIn: 'root',
})
export class CardsStateService {
  private card$$ = new BehaviorSubject<ItemWithDetails[] | null>(null);

  public card$ = this.card$$.asObservable();

  public filteredCards$: Observable<ItemWithDetails[] | undefined> = this.filterByValueService.filterParameter$.pipe(
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

  public sortData(filteredCards: Observable<ItemWithDetails[] | undefined>): Observable<ItemWithDetails[] | undefined> {
    return combineLatest(filteredCards, this.sortingCardsService.sortingParams$).pipe(
      map(([cards, sortingParam]) => cards && this.sortingCardsService.sortingData(cards, sortingParam))
    );
  }

  public getCards$(targetValue: string): Observable<ItemWithDetails[]> {
    return this.youtubeHttpService.get$(targetValue.toLowerCase()).pipe(
      map(({ items }) => items),
      switchMap(searchItems => this.youtubeHttpService.getVideos$(...searchItems).pipe(map(({ items }) => items)))
    );
  }

  public getFilteredValue(): void {
    this.filterByValueService.updateData('');
  }

  public updateData(data: ItemWithDetails[]): void {
    this.card$$.next(data);
  }
}