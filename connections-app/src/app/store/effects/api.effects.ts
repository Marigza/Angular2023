import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { ConnectionsHttpService } from '../../core/services/connections-http.service';
import { loginActions } from '../actions/login-page.actions';

@Injectable()
export class ApiLoginEffects {
  public getUserLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginActions.loginRequestSend),
      exhaustMap(({ login }) =>
        this.connectionsHttpService.loginPost$(login).pipe(
          tap(response => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('uid', response.uid);
            localStorage.setItem('email', login.email);
          }),
          map(response => {
            this.router.navigate(['/']).catch(({ message }: Error) => message || null);

            return loginActions.loginSuccess({ response, email: login.email });
          }),

          catchError((error: HttpErrorResponse) => of(loginActions.loginFail({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    private connectionsHttpService: ConnectionsHttpService
  ) {}
}
