import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { createActionGroup, props } from '@ngrx/store';

import { RegisterParams } from '../../core/models/register-params.model';
import { ActionSource } from '../enum/action-source.enum';

export const registrationActions = createActionGroup({
  source: ActionSource.Registration,
  events: {
    'Registration Success': props<{ response: HttpStatusCode }>(),
    'Registration Fail': props<{ error: HttpErrorResponse }>(),
    'Registration Request Send': props<{ registration: RegisterParams }>(),
  },
});
