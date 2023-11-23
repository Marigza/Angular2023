import { createReducer, on } from '@ngrx/store';

import { youtubeApiActions } from '../actions/card-api.actions';
import { adminCardActions } from '../actions/custom-card.actions';
import { mainPageActions } from '../actions/main-page-card.actions';
import { viewPageActions } from '../actions/view-page-card.actions';
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
  on(mainPageActions.deleteCustomCard, viewPageActions.deleteCustomCard, (state, action) => ({
    ...state,
    customCards: state.customCards
      .slice(
        0,
        state.customCards.findIndex(({ id }) => id === action.id)
      )
      .concat(state.customCards.slice(state.customCards.findIndex(({ id }) => id === action.id) + 1)),
  })),
  on(mainPageActions.addFavoriteCard, viewPageActions.addFavoriteCard, (state, action) => ({
    ...state,
    favoriteCards: state.favoriteCards.concat(action.card),
  })),
  on(mainPageActions.deleteFavoriteCard, viewPageActions.deleteFavoriteCard, (state, action) => ({
    ...state,
    favoriteCards: state.favoriteCards
      .slice(
        0,
        state.favoriteCards.findIndex(({ id }) => id === action.id)
      )
      .concat(state.favoriteCards.slice(state.favoriteCards.findIndex(({ id }) => id === action.id) + 1)),
  }))
);
