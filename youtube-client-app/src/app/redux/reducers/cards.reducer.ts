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
  error: null,
  isLoading: false,
};

export const cardsFeatureKey = 'cards';

export const customCardReducer = createReducer(
  initialState,
  on(youtubeApiActions.requestSend, state => ({ ...state, isLoading: true })),
  on(youtubeApiActions.cardsLoadedSuccess, (state, { cards }) => ({
    ...state,
    youtubeCards: cards,
    isLoading: false,
    error: null,
  })),
  on(youtubeApiActions.cardsLoadedFail, state => ({ ...state, isLoading: false, error: 'An error has occurred' })),
  on(adminCardActions.createCustomCard, (state, { card }) => ({
    ...state,
    customCards: state.customCards.concat(card),
    isLoading: false,
  })),
  on(mainPageActions.deleteCustomCard, viewPageActions.deleteCustomCard, (state, action) => ({
    ...state,
    customCards: state.customCards.filter(({ id }) => id !== action.id),
    isLoading: false,
  })),
  on(mainPageActions.addFavoriteCard, viewPageActions.addFavoriteCard, (state, { card }) => ({
    ...state,
    favoriteCards: state.favoriteCards.concat(card),
    isLoading: false,
  })),
  on(mainPageActions.deleteFavoriteCard, viewPageActions.deleteFavoriteCard, (state, action) => ({
    ...state,
    favoriteCards: state.favoriteCards.filter(({ id }) => id !== action.id),
    isLoading: false,
  }))
);
