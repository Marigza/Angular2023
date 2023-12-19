import { createFeatureSelector, createSelector } from '@ngrx/store';

import { YoutubeStore } from '../models/youtube-store.model';
import { cardsFeatureKey } from '../reducers/cards.reducer';

export const selectFeature = createFeatureSelector<YoutubeStore>(cardsFeatureKey);

export const selectCustomCards = createSelector(selectFeature, ({ customCards }) => customCards);

export const selectFavoriteCards = createSelector(selectFeature, ({ favoriteCards }) => favoriteCards);

export const selectYoutubeCards = createSelector(selectFeature, ({ youtubeCards }) => youtubeCards);

export const selectAllCards = createSelector(selectFeature, ({ customCards, youtubeCards }) =>
  customCards.concat(youtubeCards)
);
