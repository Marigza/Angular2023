import { createActionGroup, props } from '@ngrx/store';

import { ItemWithDetails } from '../../youtube/models/item-with-details.model';
import { ActionSource } from '../enums/action-source.enum';

export const viewPageActions = createActionGroup({
  source: ActionSource.ViewPage,
  events: {
    'Add Favorite Card': props<{ card: ItemWithDetails }>(),
    'Delete Favorite Card': props<{ id: string }>(),
    'Delete Custom Card': props<{ id: string }>(),
  },
});
