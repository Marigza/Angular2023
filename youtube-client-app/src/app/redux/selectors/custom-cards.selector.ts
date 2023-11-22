import { createFeatureSelector, createSelector } from '@ngrx/store';

import { YoutubeStore } from '../models/youtube-store.model';
import { cardsFeatureKey } from '../reducers/cards.reducer';

export const selectFeature = createFeatureSelector<YoutubeStore>(cardsFeatureKey);

export const selectCustomCards = createSelector(selectFeature, (state: YoutubeStore) => state.customCards);

export const selectFavoriteCards = createSelector(selectFeature, (state: YoutubeStore) => state.favoriteCards);
