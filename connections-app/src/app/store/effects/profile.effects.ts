import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { ConnectionsHttpService } from '../../core/services/connections-http.service';
import { loginActions } from '../actions/login-page.actions';
import { profileActions } from '../actions/profile-page.actions';
import { registrationActions } from '../actions/registration-page.actions';

@Injectable()
export class ProfileEffects {
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

  public initUserRegistration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registrationActions.registrationRequestSend),
      exhaustMap(({ registration }) =>
        this.connectionsHttpService.registerPost$(registration).pipe(
          map(response => {
            this.router.navigate(['/signin']).catch(({ message }: Error) => message || null);

            return registrationActions.registrationSuccess({ response });
          }),
          catchError((error: HttpErrorResponse) => of(registrationActions.registrationFail({ error })))
        )
      )
    );
  });

  public getProfileInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.profileRequestSend),
      exhaustMap(({ token }) =>
        this.connectionsHttpService.getProfile$(token).pipe(
          map(response => profileActions.profileInfoGetSuccess({ response })),
          catchError((error: HttpErrorResponse) => of(profileActions.profileInfoGetFail({ error })))
        )
      )
    );
  });

  public updateProfileInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.profileUpdateRequest),
      exhaustMap(({ token, name }) =>
        this.connectionsHttpService.updateProfile$(token, name).pipe(
          map(response => profileActions.profileUpdateSuccess({ response, name })),
          catchError((error: HttpErrorResponse) => of(profileActions.profileUpdateFail({ error })))
        )
      )
    );
  });

  public logoutProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.profileLogoutSend),
      exhaustMap(({ token }) =>
        this.connectionsHttpService.logout$(token).pipe(
          map(response => {
            this.router.navigate(['/signin']).catch(({ message }: Error) => message || null);

            return profileActions.profileLogoutSuccess({ response });
          }),
          tap(() => {
            localStorage.clear();
          }),
          catchError((error: HttpErrorResponse) => of(profileActions.profileLogoutFail({ error })))
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
