import { createActionGroup, props } from '@ngrx/store';

import { ItemWithDetails } from '../../youtube/models/item-with-details.model';
import { ActionSource } from '../enums/action-source.enum';

export const adminCardActions = createActionGroup({
  source: ActionSource.Admin,
  events: {
    'Create Custom Card': props<{ card: ItemWithDetails }>(),
  },
});
