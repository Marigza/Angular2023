import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CardsStoreFacadeService } from '../../../shared/services/cards-store-facade.service';
import { ItemWithDetails } from '../../../youtube/models/item-with-details.model';

@Component({
  selector: 'yta-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
  public favoriteCards$: Observable<ItemWithDetails[]> = this.cardsStoreFacadeService.favoriteCards$;

  constructor(private cardsStoreFacadeService: CardsStoreFacadeService) {}

  /* eslint-disable class-methods-use-this */

  public trackByCards(index: number, item: ItemWithDetails): string {
    return item.id;
  }

  /* eslint-enable class-methods-use-this */
}
