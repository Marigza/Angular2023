import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

import { ItemWithDetails } from '../../models/item-with-details.model';
import { CardsStateService } from '../../services/cards-state.service';

@Component({
  selector: 'yta-detailed-info-page',
  templateUrl: './detailed-info-page.component.html',
  styleUrls: ['./detailed-info-page.component.scss'],
})
export class DetailedInfoPageComponent {
  public isFavorite = false;

  public isCustomCard = false;

  public card$: Observable<ItemWithDetails | undefined> = this.cardsStateService.commonCards$.pipe(
    map(cards => cards?.find(({ id }) => id === this.routeId))
  );

  constructor(
    private route: ActivatedRoute,
    private cardsStateService: CardsStateService
  ) {}

  public toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  private get routeId(): string {
    const routeParams = this.route.snapshot.paramMap;
    const itemIdFromRoute = routeParams.get('cardId');

    return itemIdFromRoute ?? '';
  }
}
