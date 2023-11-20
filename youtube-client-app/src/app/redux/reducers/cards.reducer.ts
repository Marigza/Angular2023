import { createReducer, on } from '@ngrx/store';

import { youtubeApiActions } from '../actions/card-api.actions';
import { adminCardActions } from '../actions/custom-card.actions';
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
  }))
);
