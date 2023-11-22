import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectFavoriteCards } from 'src/app/redux/selectors/custom-cards.selector';
import { ItemWithDetails } from 'src/app/youtube/models/item-with-details.model';

@Component({
  selector: 'yta-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
  public favoriteCards$: Observable<ItemWithDetails[]> = this.store.select(selectFavoriteCards);

  constructor(private store: Store) {}

  /* eslint-disable class-methods-use-this */

  public trackByCards(index: number, item: ItemWithDetails): string {
    return item.id;
  }

  /* eslint-enable class-methods-use-this */
}
