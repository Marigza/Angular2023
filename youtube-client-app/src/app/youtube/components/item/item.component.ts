import { Component, Input } from '@angular/core';

import { ItemWithDetails } from '../../models/item-with-details.model';

@Component({
  selector: 'yta-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() public card!: ItemWithDetails;

  public isFavorite = false;

  public isCustomCard = false;

  public toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }
}
