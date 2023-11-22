import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';

import { selectCustomCards } from '../../../redux/selectors/custom-cards.selector';
import { ItemWithDetails } from '../../models/item-with-details.model';
import { CardsStateService } from '../../services/cards-state.service';

@Component({
  selector: 'yta-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  public youtubeCards$: Observable<ItemWithDetails[] | undefined> = this.cardsStateService.filteredCards$; // не должно быть undefined

  public customCards$: Observable<ItemWithDetails[]> = this.store.select(selectCustomCards);

  public cards$: Observable<ItemWithDetails[]> = combineLatest([this.customCards$, this.youtubeCards$]).pipe(
    map(([custom, youtube]) => [custom || [], youtube || []]),
    map(([custom, youtube]) => custom.concat(youtube))
  );

  constructor(
    public cardsStateService: CardsStateService,
    private store: Store
  ) {}

  /* eslint-disable class-methods-use-this */

  public trackByCards(index: number, item: ItemWithDetails): string {
    return item.id;
  }

  /* eslint-enable class-methods-use-this */
}
