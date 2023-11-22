import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';

import { ItemWithDetails } from '../../models/item-with-details.model';
import { CardsStateService } from '../../services/cards-state.service';

@Component({
  selector: 'yta-detailed-info-page',
  templateUrl: './detailed-info-page.component.html',
  styleUrls: ['./detailed-info-page.component.scss'],
})
export class DetailedInfoPageComponent implements OnInit, OnDestroy {
  public isFavorite = false;

  public isCustomCard = false;

  public subs = new Subscription();

  public card$: Observable<ItemWithDetails | undefined> = this.cardsStateService.commonCards$.pipe(
    map(cards => cards?.find(({ id }) => id === this.routeId))
  );

  constructor(
    private route: ActivatedRoute,
    private cardsStateService: CardsStateService
  ) {}

  public ngOnInit(): void {
    this.subs.add(
      this.card$.subscribe(card => {
        this.isCustomCard = card?.kind === 'custom#video'; // add ES6 syntax
      })
    );
  }

  public toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  private get routeId(): string {
    const routeParams = this.route.snapshot.paramMap;
    const itemIdFromRoute = routeParams.get('cardId');

    return itemIdFromRoute ?? '';
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
