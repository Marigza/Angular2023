import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoginParams } from '../../core/models/login-params.model';
import { RegisterParams } from '../../core/models/register-params.model';
import { ResponseLogin } from '../../core/models/response-login.model';
import { TokenParams } from '../../core/models/token-params.model';
import { groupDialogActions } from '../../store/actions/group-dialog-page.actions';
import { loginActions } from '../../store/actions/login-page.actions';
import { mainActions } from '../../store/actions/main-page.actions';
import { privateDialogActions } from '../../store/actions/private-dialog-page-actions';
import { profileActions } from '../../store/actions/profile-page.actions';
import { registrationActions } from '../../store/actions/registration-page.actions';
import {
  selectConversations,
  selectError,
  selectGroupDialog,
  selectGroups,
  selectIsLoading,
  selectIsTimerGroupDialogLoading,
  selectIsTimerGroupsLoading,
  selectIsTimerPeopleLoading,
  selectIsTimerPrivateDialogLoading,
  selectPeople,
  selectPrivateDialog,
  selectProfile,
  selectStatus,
  selectTimerGroupDialog,
  selectTimerGroups,
  selectTimerPeople,
  selectTimerPrivateDialog,
  selectToken,
} from '../../store/selectors/profile.selector';

@Injectable({
  providedIn: 'root',
})
export class ConnectionsStoreFacadeService {
  public isLoading$ = this.store.select(selectIsLoading);

  public selectIsTimerGroupsLoading$ = this.store.select(selectIsTimerGroupsLoading);

  public selectIsTimerPeopleLoading$ = this.store.select(selectIsTimerPeopleLoading);

  public selectIsTimerGroupDialogLoading$ = this.store.select(selectIsTimerGroupDialogLoading);

  public selectIsTimerPrivateDialogLoading$ = this.store.select(selectIsTimerPrivateDialogLoading);

  public selectError$ = this.store.select(selectError);

  public selectProfile$ = this.store.select(selectProfile);

  public selectToken$ = this.store.select(selectToken);

  public selectGroups$ = this.store.select(selectGroups);

  public selectPeople$ = this.store.select(selectPeople);

  public selectGroupDialog$ = this.store.select(selectGroupDialog);

  public selectPrivateDialog$ = this.store.select(selectPrivateDialog);

  public timerGroupDialog$ = this.store.select(selectTimerGroupDialog);

  public timerPrivateDialog$ = this.store.select(selectTimerPrivateDialog);

  public selectConversations$ = this.store.select(selectConversations);

  public timerGroups$ = this.store.select(selectTimerGroups);

  public timerPeople$ = this.store.select(selectTimerPeople);

  public status$ = this.store.select(selectStatus);

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

  public peopleUpdate(token: TokenParams): void {
    this.store.dispatch(mainActions.peopleUpdate({ token }));
  }

  public conversationsRequestSend(token: TokenParams): void {
    this.store.dispatch(mainActions.conversationsRequestSend({ token }));
  }

  public createConversation(token: TokenParams, user: string): void {
    this.store.dispatch(mainActions.createConversation({ token, user }));
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

  public groupDialogData(token: TokenParams, groupId: string, since = 0): void {
    this.store.dispatch(groupDialogActions.groupDialogDataRequestSend({ token, groupId, since }));
  }

  public groupDialogDataUpdate(token: TokenParams, groupId: string, since: number): void {
    this.store.dispatch(groupDialogActions.groupDialogDataUpdateRequestSend({ token, groupId, since }));
  }

  public groupDialogAddMessage(token: TokenParams, groupId: string, message: string): void {
    this.store.dispatch(groupDialogActions.groupDialogAddMessageRequestSend({ token, groupId, message }));
  }

  public deleteGroupFromDialog(token: TokenParams, groupId: string): void {
    this.store.dispatch(groupDialogActions.deleteGroupDialogRequestSend({ token, groupId }));
  }

  public goAwayFromGroup(): void {
    this.store.dispatch(groupDialogActions.goAwayFromCurrentPage());
  }

  public privateDialogData(token: TokenParams, conversationId: string, since = 0): void {
    this.store.dispatch(privateDialogActions.privateDialogDataRequestSend({ token, conversationId, since }));
  }

  public privateDialogDataUpdate(token: TokenParams, conversationId: string, since: number): void {
    this.store.dispatch(privateDialogActions.privateDialogDataUpdateRequestSend({ token, conversationId, since }));
  }

  public privateDialogAddMessage(token: TokenParams, conversationId: string, message: string): void {
    this.store.dispatch(privateDialogActions.privateDialogAddMessageRequestSend({ token, conversationId, message }));
  }

  public deletePrivateDialog(token: TokenParams, conversationId: string): void {
    this.store.dispatch(privateDialogActions.deletePrivateDialogRequestSend({ token, conversationId }));
  }

  public goAwayFromPrivate(): void {
    this.store.dispatch(privateDialogActions.goAwayFromCurrentPage());
  }
}
