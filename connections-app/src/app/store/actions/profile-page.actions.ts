import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { createActionGroup, props } from '@ngrx/store';

import { ProfileParams } from '../../core/models/profile-params.model';
import { TokenParams } from '../../core/models/token-params.model';
import { ActionSource } from '../enum/action-source.enum';

export const profileActions = createActionGroup({
  source: ActionSource.Profile,
  events: {
    'Profile Info Get Success': props<{ response: ProfileParams }>(),
    'Profile Info Get Fail': props<{ error: HttpErrorResponse }>(),
    'Profile Request Send': props<{ token: TokenParams }>(),
    'Profile Update Request': props<{ token: TokenParams; name: string }>(),
    'Profile Update Success': props<{ response: HttpStatusCode; name: string }>(),
    'Profile Update Fail': props<{ error: HttpErrorResponse }>(),
  },
});
