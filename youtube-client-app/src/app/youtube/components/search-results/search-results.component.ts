import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchItem } from '../../models/search-item.model';
import { CardsStateService } from '../../services/cards-state.service';

@Component({
  selector: 'yta-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  public cards$: Observable<SearchItem[] | undefined> = this.cardsStateService.filteredCards$;

  constructor(public cardsStateService: CardsStateService) {}
}
