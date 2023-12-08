import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, props } from '@ngrx/store';

import { LoginParams } from '../../core/models/login-params.model';
import { ResponseLogin } from '../../core/models/response-login.model';
import { ActionSource } from '../enum/action-source.enum';

export const loginActions = createActionGroup({
  source: ActionSource.Login,
  events: {
    'Login Success': props<{ response: ResponseLogin; email: string }>(),
    'Login Fail': props<{ error: HttpErrorResponse }>(),
    'Login Request Send': props<{ login: LoginParams }>(),
  },
});
