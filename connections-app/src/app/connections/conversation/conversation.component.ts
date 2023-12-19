import { Component, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { exhaustMap, filter, map, Subscription, take } from 'rxjs';

import { MessageParams } from '../../core/models/message-params.model';
import { TokenParams } from '../../core/models/token-params.model';
import { ModalWindowConfirmDeletePrivateComponent } from '../../shared/modal-window-confirm-delete-private/modal-window-confirm-delete-private.component';
import { ConnectionsStoreFacadeService } from '../../shared/services/connections-store-facade.service';

@Component({
  selector: 'con-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit, OnDestroy {
  public isLoad$ = this.connectionsStoreFacadeService.isLoading$.pipe(
    exhaustMap(() => this.connectionsStoreFacadeService.selectIsTimerPrivateDialogLoading$)
  );

  public timer$ = this.connectionsStoreFacadeService.timerPrivateDialog$;

  public dialog$ = this.connectionsStoreFacadeService.selectPrivateDialog$.pipe(
    map(messages => {
      const mesagesSorted = messages.slice();
      mesagesSorted.sort((a: MessageParams, b: MessageParams) => Number(a.createdAt.S) - Number(b.createdAt.S));

      return mesagesSorted;
    })
  );

  public people$ = this.connectionsStoreFacadeService.selectPeople$;

  public conversations$ = this.connectionsStoreFacadeService.selectConversations$;

  public message = this.formBuilder.group({
    text: ['', [Validators.required]],
  });

  public currentDialogId = this.routeId;

  public isExistDialog = true;

  public subs = new Subscription();

  private userToken: TokenParams | null = null;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.connectionsStoreFacadeService.selectToken$.pipe(filter(Boolean), take(1)).subscribe(userToken => {
      this.userToken = userToken;
    });

    if (!this.userToken) return;
    this.subs.add(
      this.people$
        .pipe(
          filter(people => people.length === 0),
          map(() => {
            this.userToken && this.connectionsStoreFacadeService.peopleRequestSend(this.userToken);
          })
        )
        .subscribe()
    );

    this.subs.add(
      this.conversations$
        .pipe(
          filter(conversations => conversations.length === 0),
          map(() => {
            this.userToken && this.connectionsStoreFacadeService.conversationsRequestSend(this.userToken);
          })
        )
        .subscribe()
    );

    // TODO только для первого входа в группу!!!
    this.connectionsStoreFacadeService.privateDialogData(this.userToken, this.currentDialogId);

    this.subs.add(
      this.connectionsStoreFacadeService.selectConversations$
        .pipe(map(people => people.map(user => user.id.S)))
        .subscribe(people => {
          this.isExistDialog = people.includes(this.currentDialogId);
        })
    );
  }

  public update(): void {
    if (!this.userToken) return;
    this.connectionsStoreFacadeService.privateDialogDataUpdate(this.userToken, this.currentDialogId, 0);
  }

  public delete(): void {
    this.dialog.open(ModalWindowConfirmDeletePrivateComponent, {
      data: this.currentDialogId,
    });
  }

  public onSendMessage(): void {
    if (!this.userToken) return;

    const message = this.message.get('text')?.value;

    if (!message) return;

    this.connectionsStoreFacadeService.privateDialogAddMessage(this.userToken, this.currentDialogId, message);
    this.message.get('text')?.setValue('');
  }

  public cleanMessageInStore(): void {
    this.connectionsStoreFacadeService.goAwayFromPrivate();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private get routeId(): string {
    const routeParams = this.route.snapshot.paramMap;
    const dialogIdFromRoute = routeParams.get('conversationId');

    return dialogIdFromRoute ?? '';
  }
}
