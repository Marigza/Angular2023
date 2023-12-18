import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ConnectionStore } from '../models/connection-store.model';
import { connectionFeatureKey } from '../reducers/profile.reducer';

export const selectFeature = createFeatureSelector<ConnectionStore>(connectionFeatureKey);

export const selectToken = createSelector(selectFeature, ({ token }) => token);

export const selectProfile = createSelector(selectFeature, ({ profile }) => profile);

export const selectError = createSelector(selectFeature, ({ error }) => error);

export const selectIsLoading = createSelector(selectFeature, ({ isLoading }) => isLoading);

export const selectIsTimerGroupsLoading = createSelector(
  selectFeature,
  ({ isTimerGroupsLoading }) => isTimerGroupsLoading
);

export const selectIsTimerPeopleLoading = createSelector(
  selectFeature,
  ({ isTimerPeopleLoading }) => isTimerPeopleLoading
);

export const selectGroups = createSelector(selectFeature, ({ groups }) => groups);

export const selectPeople = createSelector(selectFeature, ({ people }) => people);

export const selectConversations = createSelector(selectFeature, ({ conversations }) => conversations);

export const selectTimerGroups = createSelector(selectFeature, ({ timerGroups }) => timerGroups);

export const selectTimerPeople = createSelector(selectFeature, ({ timerPeople }) => timerPeople);

export const selectGroupDialog = createSelector(selectFeature, ({ groupDialog }) => groupDialog);

export const selectPrivateDialog = createSelector(selectFeature, ({ privateDialog }) => privateDialog);

export const selectTimerGroupDialog = createSelector(selectFeature, ({ timerGroupDialog }) => timerGroupDialog);

export const selectTimerPrivateDialog = createSelector(selectFeature, ({ timerPrivateDialog }) => timerPrivateDialog);

export const selectIsTimerGroupDialogLoading = createSelector(
  selectFeature,
  ({ isTimerGroupDialogLoading }) => isTimerGroupDialogLoading
);

export const selectIsTimerPrivateDialogLoading = createSelector(
  selectFeature,
  ({ isTimerPrivateDialogLoading }) => isTimerPrivateDialogLoading
);
