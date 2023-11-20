import { createActionGroup, props } from '@ngrx/store';

import { CardProps } from '../../youtube/models/card-props.model';

export const adminCardActions = createActionGroup({
  source: 'Admin',
  events: {
    'Create Custom Card': props<{ card: CardProps }>(),
    'Obtain Custom Cards': props<{ cards: CardProps[] }>(),
    'Delete Custom Cards': props<{ cardIndex: number }>(),
  },
});
