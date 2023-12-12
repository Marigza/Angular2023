import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoginParams } from '../../core/models/login-params.model';
import { RegisterParams } from '../../core/models/register-params.model';
import { ResponseLogin } from '../../core/models/response-login.model';
import { TokenParams } from '../../core/models/token-params.model';
import { loginActions } from '../../store/actions/login-page.actions';
import { mainActions } from '../../store/actions/main-page.actions';
import { profileActions } from '../../store/actions/profile-page.actions';
import { registrationActions } from '../../store/actions/registration-page.actions';
import {
  selectError,
  selectGroups,
  selectIsLoading,
  selectIsTimerLoading,
  selectPeople,
  selectProfile,
  selectTimer,
  selectToken,
} from '../../store/selectors/profile.selector';

@Injectable({
  providedIn: 'root',
})
export class ConnectionsStoreFacadeService {
  public isLoading$ = this.store.select(selectIsLoading);

  public selectIsTimerLoading$ = this.store.select(selectIsTimerLoading);

  public selectError$ = this.store.select(selectError);

  public selectProfile$ = this.store.select(selectProfile);

  public selectToken$ = this.store.select(selectToken);

  public selectGroups$ = this.store.select(selectGroups);

  public selectPeople$ = this.store.select(selectPeople);

  public timer$ = this.store.select(selectTimer);

  constructor(private store: Store) {}

  public loginRequestSend(login: LoginParams): void {
    this.store.dispatch(loginActions.loginRequestSend({ login }));
  }

  public loginSuccess(response: ResponseLogin, email: LoginParams['email']): void {
    this.store.dispatch(loginActions.loginSuccess({ response, email }));
  }

  public loginFail(response: HttpErrorResponse): void {
    this.store.dispatch(loginActions.loginFail({ error: response }));
  }

  public registrationRequestSend(params: RegisterParams): void {
    this.store.dispatch(registrationActions.registrationRequestSend({ registration: params }));
  }

  public registrationSuccess(code: HttpStatusCode): void {
    this.store.dispatch(registrationActions.registrationSuccess({ response: code }));
  }

  public registrationFail(response: HttpErrorResponse): void {
    this.store.dispatch(registrationActions.registrationFail({ error: response }));
  }

  public groupsRequestSend(token: TokenParams): void {
    this.store.dispatch(mainActions.groupsRequestSend({ token }));
  }

  public groupsUpdate(token: TokenParams): void {
    this.store.dispatch(mainActions.groupsUpdate({ token }));
  }

  public createGroup(token: TokenParams, name: string): void {
    this.store.dispatch(mainActions.createGroup({ token, name }));
  }

  public deleteGroup(token: TokenParams, group: string): void {
    this.store.dispatch(mainActions.deleteGroup({ token, group }));
  }

  public peopleRequestSend(token: TokenParams): void {
    this.store.dispatch(mainActions.peopleRequestSend({ token }));
  }

  public profileRequestSend(token: TokenParams): void {
    this.store.dispatch(profileActions.profileRequestSend({ token }));
  }

  public profileUpdateRequest(token: TokenParams, name: string): void {
    this.store.dispatch(profileActions.profileUpdateRequest({ token, name }));
  }

  public profileLogoutSend(token: TokenParams): void {
    this.store.dispatch(profileActions.profileLogoutSend({ token }));
  }
}
