import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ConnectionStore } from '../models/connection-store.model';
import { connectionFeatureKey } from '../reducers/profile.reducer';

export const selectFeature = createFeatureSelector<ConnectionStore>(connectionFeatureKey);

export const selectToken = createSelector(selectFeature, ({ token }) => token);

export const selectProfile = createSelector(selectFeature, ({ profile }) => profile);

export const selectError = createSelector(selectFeature, ({ error }) => error);

export const selectIsLoading = createSelector(selectFeature, ({ isLoading }) => isLoading);
