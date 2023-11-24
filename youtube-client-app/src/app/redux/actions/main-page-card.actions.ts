import { createActionGroup, props } from '@ngrx/store';

import { ItemWithDetails } from '../../youtube/models/item-with-details.model';
import { ActionSource } from '../enums/action-source.enum';

export const mainPageActions = createActionGroup({
  source: ActionSource.MainPage,
  events: {
    'Add Favorite Card': props<{ card: ItemWithDetails }>(),
    'Delete Favorite Card': props<{ id: string }>(),
    'Delete Custom Card': props<{ id: string }>(),
  },
});
