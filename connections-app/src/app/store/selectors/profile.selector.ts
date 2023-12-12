import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ConnectionStore } from '../models/connection-store.model';
import { connectionFeatureKey } from '../reducers/profile.reducer';

export const selectFeature = createFeatureSelector<ConnectionStore>(connectionFeatureKey);

export const selectToken = createSelector(selectFeature, ({ token }) => token);

export const selectProfile = createSelector(selectFeature, ({ profile }) => profile);

export const selectError = createSelector(selectFeature, ({ error }) => error);

export const selectIsLoading = createSelector(selectFeature, ({ isLoading }) => isLoading);

export const selectIsTimerLoading = createSelector(selectFeature, ({ isTimerLoading }) => isTimerLoading);

export const selectGroups = createSelector(selectFeature, ({ groups }) => groups);

export const selectPeople = createSelector(selectFeature, ({ people }) => people);

export const selectTimer = createSelector(selectFeature, ({ timer }) => timer);
