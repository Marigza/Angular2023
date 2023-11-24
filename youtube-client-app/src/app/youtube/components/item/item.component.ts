import { Component, Input } from '@angular/core';

import { CardsStoreFacadeService } from '../../../shared/services/cards-store-facade.service';
import { ItemWithDetails } from '../../models/item-with-details.model';

@Component({
  selector: 'yta-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() public card!: ItemWithDetails;

  public isFavorite = false;

  // public isFavorite = this.store.select(selectFavoriteCards).pipe(map(cards => cards.map(({ id }) => id).includes(this.card.id)));

  // card.isFavorite create logic

  constructor(private cardsStoreFacadeService: CardsStoreFacadeService) {}

  public toggleFavorite(): void {
    this.isFavorite
      ? this.cardsStoreFacadeService.deleteFavoriteCard(this.card.id)
      : this.cardsStoreFacadeService.addFavoriteCard(this.card);

    this.isFavorite = !this.isFavorite;
  }

  public get isCustomCard(): boolean {
    return this.card?.kind === 'custom#video';
  }

  public deleteCustomCard(): void {
    this.cardsStoreFacadeService.deleteCustomCard(this.card.id);
  }
}
