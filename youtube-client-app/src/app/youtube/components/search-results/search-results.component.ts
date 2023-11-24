import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CardsStoreFacadeService } from '../../../shared/services/cards-store-facade.service';
import { ItemWithDetails } from '../../models/item-with-details.model';
import { CardsStateService } from '../../services/cards-state.service';

@Component({
  selector: 'yta-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  public cards$: Observable<ItemWithDetails[]> = this.cardsStoreFacadeService.allCards$;

  constructor(
    public cardsStateService: CardsStateService,
    private cardsStoreFacadeService: CardsStoreFacadeService
  ) {}

  /* eslint-disable class-methods-use-this */

  public trackByCards(index: number, item: ItemWithDetails): string {
    return item.id;
  }

  /* eslint-enable class-methods-use-this */
}
