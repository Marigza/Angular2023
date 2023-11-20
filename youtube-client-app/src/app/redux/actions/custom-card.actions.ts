import { createActionGroup, props } from '@ngrx/store';

import { ItemWithDetails } from '../../youtube/models/item-with-details.model';

export const adminCardActions = createActionGroup({
  source: 'Admin',
  events: {
    'Create Custom Card': props<{ card: ItemWithDetails }>(),
    'Obtain Custom Cards': props<{ cards: ItemWithDetails[] }>(),
    'Delete Custom Cards': props<{ cardIndex: number }>(),
  },
});
