import { Component, Input } from '@angular/core';

import { CardsStoreFacadeService } from '../../../shared/services/cards-store-facade.service';
import { ItemWithDetails } from '../../../youtube/models/item-with-details.model';

@Component({
  selector: 'yta-item-favorite',
  templateUrl: './item-favorite.component.html',
  styleUrls: ['./item-favorite.component.scss'],
})
export class ItemFavoriteComponent {
  @Input() public card!: ItemWithDetails;

  public isFavorite = true;

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
