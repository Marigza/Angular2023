import { createActionGroup, props } from '@ngrx/store';

import { ItemWithDetails } from 'src/app/youtube/models/item-with-details.model';

export const youtubeApiActions = createActionGroup({
  source: 'Youtube API',
  events: {
    'Cards Loaded Success': props<{ cards: ItemWithDetails[] }>(),
    'Cards Loaded Fail': props<{ error: Error }>(),
  },
});
