import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, endWith, exhaustMap, map } from 'rxjs/operators';

import { ConnectionsHttpService } from '../../core/services/connections-http.service';
import { CountDownService } from '../../core/services/count-down.service';
import { mainActions } from '../actions/main-page.actions';
import { privateDialogActions } from '../actions/private-dialog-page-actions';

@Injectable()
export class PeopleEffects {
  public getPeople$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(mainActions.peopleRequestSend),
      exhaustMap(({ token }) =>
        this.connectionsHttpService.getPeople$(token).pipe(
          map(response => mainActions.peopleGetSuccess({ response })),
          catchError((error: HttpErrorResponse) => of(mainActions.peopleGetFail({ error })))
        )
      )
    );
  });

  public updatePeople$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(mainActions.peopleUpdate),
      exhaustMap(({ token }) =>
        this.connectionsHttpService.getPeople$(token).pipe(
          map(response => mainActions.peopleUpdateSuccess({ response })),
          catchError((error: HttpErrorResponse) => of(mainActions.peopleUpdateFail({ error })))
        )
      )
    );
  });

  public createConversation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(mainActions.createConversation),
      exhaustMap(({ token, user }) =>
        this.connectionsHttpService.createConversation$(token, user).pipe(
          map(response => {
            this.router
              .navigate([`/conversation/${response.conversationID}`])
              .catch(({ message }: Error) => message || null);

            return mainActions.createConversationSuccess({
              response: {
                id: { S: response.conversationID },
                companionID: { S: user },
              },
            });
          }),
          catchError((error: HttpErrorResponse) => of(mainActions.createConversationFail({ error })))
        )
      )
    );
  });

  public getConversationsList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(mainActions.conversationsRequestSend),
      exhaustMap(({ token }) =>
        this.connectionsHttpService.getConversatonsList$(token).pipe(
          map(response => mainActions.conversationsGetSuccess({ response })),
          catchError((error: HttpErrorResponse) => of(mainActions.conversationsGetFail({ error })))
        )
      )
    );
  });

  public startTimerPeople$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(mainActions.peopleUpdateSuccess),
      exhaustMap(() =>
        this.countDownService.timer$.pipe(
          map(value => mainActions.currentTimerPeople({ time: value })),
          endWith(mainActions.endTimerPeople({ time: null })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  public getPrivateDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(privateDialogActions.privateDialogDataRequestSend),
      exhaustMap(({ token, conversationId }) =>
        this.connectionsHttpService.getPrivateDialog$(token, conversationId).pipe(
          map(response => privateDialogActions.privateDialogDataGetSuccess({ response })),
          catchError((error: HttpErrorResponse) => of(privateDialogActions.privateDialogDataGetFail({ error })))
        )
      )
    );
  });

  // TODO обновить метод ниже после подключения параметра sinse

  public updatePrivateDialog = createEffect(() => {
    return this.actions$.pipe(
      ofType(privateDialogActions.privateDialogDataUpdateRequestSend),
      exhaustMap(({ token, conversationId }) =>
        this.connectionsHttpService.getPrivateDialog$(token, conversationId).pipe(
          map(response => privateDialogActions.privateDialogDataUpdateGetSuccess({ response })),
          catchError((error: HttpErrorResponse) => of(privateDialogActions.privateDialogDataUpdateGetFail({ error })))
        )
      )
    );
  });

  public addMessageToPrivateDialog = createEffect(() => {
    return this.actions$.pipe(
      ofType(privateDialogActions.privateDialogAddMessageRequestSend),
      exhaustMap(({ token, conversationId, message }) =>
        this.connectionsHttpService.addMessageToPrivateDialog$(token, conversationId, message).pipe(
          map(() =>
            privateDialogActions.privateDialogAddMessageSuccess({
              message: {
                authorID: { S: token.uid },
                message: { S: message },
                createdAt: { S: Date.now().toString() },
              },
            })
          ),
          catchError((error: HttpErrorResponse) => of(privateDialogActions.privateDialogAddMessageFail({ error })))
        )
      )
    );
  });

  public deletePrivateDialogPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(privateDialogActions.deletePrivateDialogRequestSend),
      exhaustMap(({ token, conversationId }) =>
        this.connectionsHttpService.deletePrivateDialog$(token, conversationId).pipe(
          map(response => privateDialogActions.deletePrivateDialogSuccess({ response, conversationId })),
          catchError((error: HttpErrorResponse) => of(privateDialogActions.deletePrivateDialogFail({ error })))
        )
      )
    );
  });

  public startTimerPrivateDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(privateDialogActions.privateDialogDataUpdateGetSuccess),
      exhaustMap(() =>
        this.countDownService.timer$.pipe(
          map(value => privateDialogActions.currentTimerPrivateDialog({ time: value })),
          endWith(privateDialogActions.endTimerPrivateDialog({ time: null })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    private connectionsHttpService: ConnectionsHttpService,
    private countDownService: CountDownService
  ) {}
}
