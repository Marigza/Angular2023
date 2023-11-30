import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { youtubeApiActions } from '../../redux/actions/card-api.actions';
import { adminCardActions } from '../../redux/actions/custom-card.actions';
import { mainPageActions } from '../../redux/actions/main-page-card.actions';
import {
  selectAllCards,
  selectCustomCards,
  selectFavoriteCards,
  selectYoutubeCards,
} from '../../redux/selectors/store-cards.selector';
import { ItemWithDetails } from '../../youtube/models/item-with-details.model';

@Injectable({
  providedIn: 'root',
})
export class CardsStoreFacadeService {
  public allCards$ = this.store.select(selectAllCards);

  public favoriteCards$ = this.store.select(selectFavoriteCards);

  public customCards$ = this.store.select(selectCustomCards);

  public youtubeCards$ = this.store.select(selectYoutubeCards);

  constructor(private store: Store) {}

  public requestSendAction(requestValue: string): void {
    this.store.dispatch(youtubeApiActions.requestSend({ requestValue }));
  }

  public createCustomCard(card: ItemWithDetails): void {
    this.store.dispatch(adminCardActions.createCustomCard({ card }));
  }

  public deleteCustomCard(cardId: string): void {
    this.store.dispatch(mainPageActions.deleteCustomCard({ id: cardId }));
  }

  public addFavoriteCard(card: ItemWithDetails): void {
    this.store.dispatch(mainPageActions.addFavoriteCard({ card }));
  }

  public deleteFavoriteCard(cardId: string): void {
    this.store.dispatch(mainPageActions.deleteFavoriteCard({ id: cardId }));
  }

  public getCardById(cardId: string): Observable<ItemWithDetails | undefined> {
    return this.allCards$.pipe(map(cards => cards.find(({ id }) => id === cardId)));
  }

  public getFavoriteCardById(cardId: string): Observable<ItemWithDetails | undefined> {
    return this.favoriteCards$.pipe(map(cards => cards.find(({ id }) => id === cardId)));
  }
}
