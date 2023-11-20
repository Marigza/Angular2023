import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ItemWithDetails } from '../../models/item-with-details.model';
import { CardsStateService } from '../../services/cards-state.service';

@Component({
  selector: 'yta-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  public cards$: Observable<ItemWithDetails[] | undefined> = this.cardsStateService.filteredCards$;

  // public customCards$: Observable<ItemWithDetails[]> | undefined = !get from Store!

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
