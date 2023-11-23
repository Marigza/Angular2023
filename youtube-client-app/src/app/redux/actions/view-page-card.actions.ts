import { createActionGroup, props } from '@ngrx/store';

import { ItemWithDetails } from '../../youtube/models/item-with-details.model';

export const viewPageActions = createActionGroup({
  source: 'View Page',
  events: {
    'Add Favorite Card': props<{ card: ItemWithDetails }>(),
    'Delete Favorite Card': props<{ id: string }>(),
    'Delete Custom Card': props<{ id: string }>(),
  },
});
