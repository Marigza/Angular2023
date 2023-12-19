import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, endWith, exhaustMap, map } from 'rxjs/operators';

import { ConnectionsHttpService } from '../../core/services/connections-http.service';
import { CountDownService } from '../../core/services/count-down.service';
import { groupDialogActions } from '../actions/group-dialog-page.actions';
import { mainActions } from '../actions/main-page.actions';

@Injectable()
export class GroupsEffects {
  public getGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(mainActions.groupsRequestSend),
      exhaustMap(({ token }) =>
        this.connectionsHttpService.getGroups$(token).pipe(
          map(response => mainActions.groupsGetSuccess({ response })),
          catchError((error: HttpErrorResponse) => of(mainActions.groupsGetFail({ error })))
        )
      )
    );
  });

  public updateGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(mainActions.groupsUpdate),
      exhaustMap(({ token }) =>
        this.connectionsHttpService.getGroups$(token).pipe(
          map(response => mainActions.groupsUpdateSuccess({ response })),
          catchError((error: HttpErrorResponse) => of(mainActions.groupsUpdateFail({ error })))
        )
      )
    );
  });

  public startTimerGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(mainActions.groupsUpdateSuccess),
      exhaustMap(() =>
        this.countDownService.timer$.pipe(
          map(value => mainActions.currentTimerGroups({ time: value })),
          endWith(mainActions.endTimerGroups({ time: null })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  public createGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(mainActions.createGroup),
      exhaustMap(({ token, name }) =>
        this.connectionsHttpService.createGroup$(token, name).pipe(
          map(response =>
            mainActions.createGroupSuccess({
              response: {
                id: { S: response.groupID },
                name: { S: name },
                createdAt: { S: Date.now().toString() },
                createdBy: { S: token.uid },
              },
            })
          ),
          catchError((error: HttpErrorResponse) => of(mainActions.createGroupFail({ error })))
        )
      )
    );
  });

  public deleteGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(mainActions.deleteGroup),
      exhaustMap(({ token, group }) =>
        this.connectionsHttpService.deleteGroup$(token, group).pipe(
          map(response => mainActions.deleteGroupSuccess({ response, group })),
          catchError((error: HttpErrorResponse) => of(mainActions.deleteGroupFail({ error })))
        )
      )
    );
  });

  public getGroupDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(groupDialogActions.groupDialogDataRequestSend),
      exhaustMap(({ token, groupId }) =>
        this.connectionsHttpService.getGroupDialog$(token, groupId).pipe(
          map(response => groupDialogActions.groupDialogDataGetSuccess({ response })),
          catchError((error: HttpErrorResponse) => of(groupDialogActions.groupDialogDataGetFail({ error })))
        )
      )
    );
  });

  // TODO обновить метод ниже после подключения параметра sinse

  public updateGroupDialog = createEffect(() => {
    return this.actions$.pipe(
      ofType(groupDialogActions.groupDialogDataUpdateRequestSend),
      exhaustMap(({ token, groupId }) =>
        this.connectionsHttpService.getGroupDialog$(token, groupId).pipe(
          map(response => groupDialogActions.groupDialogDataUpdateGetSuccess({ response })),
          catchError((error: HttpErrorResponse) => of(groupDialogActions.groupDialogDataUpdateGetFail({ error })))
        )
      )
    );
  });

  public addMessageToGroupDialog = createEffect(() => {
    return this.actions$.pipe(
      ofType(groupDialogActions.groupDialogAddMessageRequestSend),
      exhaustMap(({ token, groupId, message }) =>
        this.connectionsHttpService.addMessageToGroupDialog$(token, groupId, message).pipe(
          map(() =>
            groupDialogActions.groupDialogAddMessageSuccess({
              message: {
                authorID: { S: token.uid },
                message: { S: message },
                createdAt: { S: Date.now().toString() },
              },
            })
          ),
          catchError((error: HttpErrorResponse) => of(groupDialogActions.groupDialogAddMessageFail({ error })))
        )
      )
    );
  });

  public deleteGroupFromDialogPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(groupDialogActions.deleteGroupDialogRequestSend),
      exhaustMap(({ token, groupId }) =>
        this.connectionsHttpService.deleteGroup$(token, groupId).pipe(
          map(response => groupDialogActions.deleteGroupDialogSuccess({ response, groupId })),
          catchError((error: HttpErrorResponse) => of(groupDialogActions.deleteGroupDialogFail({ error })))
        )
      )
    );
  });

  public startTimerGroupDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(groupDialogActions.groupDialogDataUpdateGetSuccess),
      exhaustMap(() =>
        this.countDownService.timer$.pipe(
          map(value => groupDialogActions.currentTimerGroupDialog({ time: value })),
          endWith(groupDialogActions.endTimerGroupDialog({ time: null })),
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
