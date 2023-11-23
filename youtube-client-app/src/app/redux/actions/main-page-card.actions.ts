import { createActionGroup, props } from '@ngrx/store';

import { ItemWithDetails } from '../../youtube/models/item-with-details.model';

export const mainPageActions = createActionGroup({
  source: 'Main Page',
  events: {
    'Add Favorite Card': props<{ card: ItemWithDetails }>(),
    'Delete Favorite Card': props<{ id: string }>(),
    'Delete Custom Card': props<{ id: string }>(),
  },
});
