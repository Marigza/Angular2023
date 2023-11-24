import { createActionGroup, props } from '@ngrx/store';

import { ItemWithDetails } from '../../youtube/models/item-with-details.model';
import { ActionSource } from '../enums/action-source.enum';

export const youtubeApiActions = createActionGroup({
  source: ActionSource.YoutubeApi, // string to enum
  events: {
    'Cards Loaded Success': props<{ cards: ItemWithDetails[] }>(),
    'Cards Loaded Fail': props<{ error: Error }>(),
    'Request Send': props<{ requestValue: string }>(),
  },
});
