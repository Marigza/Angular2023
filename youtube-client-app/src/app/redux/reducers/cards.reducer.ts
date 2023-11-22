import { createReducer, on } from '@ngrx/store';

import { youtubeApiActions } from '../actions/card-api.actions';
import { adminCardActions } from '../actions/custom-card.actions';
import { mainPageActions } from '../actions/toggle-favorite-main.actions';
import { YoutubeStore } from '../models/youtube-store.model';

export const initialState: YoutubeStore = {
  customCards: [],
  youtubeCards: [],
  favoriteCards: [],
};

export const cardsFeatureKey = 'cards';

export const customCardReducer = createReducer(
  initialState,
  on(youtubeApiActions.cardsLoadedSuccess, (state, action) => ({ ...state, youtubeCards: action.cards })),
  on(adminCardActions.createCustomCard, (state, card) => ({
    ...state,
    customCards: state.customCards.concat(card.card),
  })),
  on(mainPageActions.addFavoriteCard, (state, action) => ({
    ...state,
    favoriteCards: state.favoriteCards.concat(action.card),
  })),
  on(mainPageActions.deleteFavoriteCard, (state, action) => ({
    ...state,
    favoriteCards: state.favoriteCards
      .slice(
        0,
        state.favoriteCards.findIndex(({ id }) => id === action.id)
      )
      .concat(state.favoriteCards.slice(state.favoriteCards.findIndex(({ id }) => id === action.id) + 1)),
  }))
);
