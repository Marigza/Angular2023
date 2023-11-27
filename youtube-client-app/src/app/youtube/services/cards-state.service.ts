import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';

import { CardsStoreFacadeService } from '../../shared/services/cards-store-facade.service';
import { ItemWithDetails } from '../models/item-with-details.model';
import { FilterByValueService } from './filter-by-value.service';
import { SortingCardsService } from './sorting-cards.service';

@Injectable({
  providedIn: 'root',
})
export class CardsStateService {
  private card$$ = new BehaviorSubject<ItemWithDetails[] | null>(null);

  public card$ = this.card$$.asObservable();

  public filteredCards$: Observable<ItemWithDetails[] | undefined> = this.filterByValueService.filterParameter$.pipe(
    switchMap(value => {
      const filteredCards = this.youtubeCards$.pipe(
        map(cards => cards?.filter(card => card.snippet.title.toLowerCase().includes(value.toLowerCase())))
      );

      return this.sortData(filteredCards);
    })
  );

  public customCards$: Observable<ItemWithDetails[]> = this.cardsStoreFacadeService.customCards$;

  public youtubeCards$: Observable<ItemWithDetails[]> = this.cardsStoreFacadeService.youtubeCards$;

  public commonCards$: Observable<ItemWithDetails[]> = combineLatest([this.customCards$, this.filteredCards$]).pipe(
    map(([custom, youtube]) => [custom || [], youtube || []]),
    map(([custom, youtube]) => custom.concat(youtube))
  );

  constructor(
    private filterByValueService: FilterByValueService,
    private sortingCardsService: SortingCardsService,
    private cardsStoreFacadeService: CardsStoreFacadeService
  ) {}

  public sortData(filteredCards: Observable<ItemWithDetails[] | undefined>): Observable<ItemWithDetails[] | undefined> {
    return combineLatest([filteredCards, this.sortingCardsService.sortingParams$]).pipe(
      map(([cards, sortingParam]) => cards && this.sortingCardsService.sortingData(cards, sortingParam))
    );
  }

  public getFilteredValue(): void {
    this.filterByValueService.updateData('');
  }

  public updateData(data: ItemWithDetails[]): void {
    this.card$$.next(data);
  }
}
