import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CardsStoreFacadeService } from '../../../shared/services/cards-store-facade.service';
import { ItemWithDetails } from '../../models/item-with-details.model';

@Component({
  selector: 'yta-detailed-info-page',
  templateUrl: './detailed-info-page.component.html',
  styleUrls: ['./detailed-info-page.component.scss'],
})
export class DetailedInfoPageComponent implements OnInit, OnDestroy {
  public subs = new Subscription();

  public card: ItemWithDetails | undefined;

  public isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private cardsStoreFacadeService: CardsStoreFacadeService
  ) {}

  public ngOnInit(): void {
    this.subs.add(
      this.cardsStoreFacadeService.getCardById(this.routeId).subscribe(card => {
        this.card = card;
      })
    );
  }

  public get isCustomCard(): boolean {
    return this.card?.kind === 'custom#video';
  }

  public toggleFavorite(): void {
    if (this.card) {
      this.isFavorite
        ? this.cardsStoreFacadeService.deleteFavoriteCard(this.card.id)
        : this.cardsStoreFacadeService.addFavoriteCard(this.card);
    }

    this.isFavorite = !this.isFavorite;
  }

  public deleteCustomCard(): void {
    if (this.card) {
      this.cardsStoreFacadeService.deleteCustomCard(this.card.id);
    }
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private get routeId(): string {
    const routeParams = this.route.snapshot.paramMap;
    const itemIdFromRoute = routeParams.get('cardId');

    return itemIdFromRoute ?? '';
  }
}
