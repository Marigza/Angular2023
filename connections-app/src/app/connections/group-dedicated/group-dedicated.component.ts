import { Component, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { exhaustMap, filter, map, Subscription, take } from 'rxjs';

import { MessageParams } from '../../core/models/message-params.model';
import { TokenParams } from '../../core/models/token-params.model';
import { ModalWindowConfirmationComponent } from '../../shared/modal-window-confirmation/modal-window-confirmation.component';
import { ConnectionsStoreFacadeService } from '../../shared/services/connections-store-facade.service';

@Component({
  selector: 'con-group-dedicated',
  templateUrl: './group-dedicated.component.html',
  styleUrls: ['./group-dedicated.component.scss'],
})
export class GroupDedicatedComponent implements OnInit, OnDestroy {
  public isLoad$ = this.connectionsStoreFacadeService.isLoading$.pipe(
    exhaustMap(() => this.connectionsStoreFacadeService.selectIsTimerGroupDialogLoading$)
  );

  public timer$ = this.connectionsStoreFacadeService.timerGroupDialog$;

  public dialog$ = this.connectionsStoreFacadeService.selectGroupDialog$.pipe(
    map(messages => {
      const mesagesSorted = messages.slice();
      mesagesSorted.sort((a: MessageParams, b: MessageParams) => Number(a.createdAt.S) - Number(b.createdAt.S));

      return mesagesSorted;
    })
  );

  // public dialog$ = combineLatest([this.connectionsStoreFacadeService.selectPeople$, this.connectionsStoreFacadeService.selectGroupDialog$]).pipe(
  //   map(([ people, messages])=>this.getUserName(messages, people))
  // )

  public groups$ = this.connectionsStoreFacadeService.selectGroups$;

  public people$ = this.connectionsStoreFacadeService.selectPeople$;

  public currentDialogId = this.routeId;

  public message = this.formBuilder.group({
    text: ['', [Validators.required]],
  });

  public isOwner = true;

  public subs = new Subscription();

  public isExistDialog = true;

  private userToken: TokenParams | null = null;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.connectionsStoreFacadeService.selectToken$.pipe(filter(Boolean), take(1)).subscribe(userToken => {
      this.userToken = userToken;
    });

    if (!this.userToken) return;

    this.subs.add(
      this.groups$
        .pipe(
          filter(groups => groups.length === 0),
          map(() => {
            this.userToken && this.connectionsStoreFacadeService.groupsRequestSend(this.userToken);
          })
        )
        .subscribe()
    );

    // TODO только для первого входа в группу!!!
    this.connectionsStoreFacadeService.groupDialogData(this.userToken, this.currentDialogId);

    this.subs.add(
      this.connectionsStoreFacadeService.selectGroups$
        .pipe(map(groups => groups.map(group => group.id.S)))
        .subscribe(groups => {
          this.isExistDialog = groups.includes(this.currentDialogId);
        })
    );

    this.subs.add(
      this.connectionsStoreFacadeService.selectGroups$
        .pipe(map(groups => groups.find(group => group.id.S === this.currentDialogId)))
        .subscribe(group => {
          this.isOwner = group?.createdBy.S === localStorage.getItem('uid');
        })
    );
  }

  public update(): void {
    if (!this.userToken) return;
    this.connectionsStoreFacadeService.groupDialogDataUpdate(this.userToken, this.currentDialogId, 0);
  }

  public delete(): void {
    const dialog = this.dialog.open(ModalWindowConfirmationComponent, {
      data: this.currentDialogId,
    });
    this.subs.add(
      dialog.afterClosed().subscribe(() => {
        this.router.navigate(['../../']).catch(({ message }: Error) => message || null);
      })
    );
  }

  public onSendMessage(): void {
    if (!this.userToken) return;

    const message = this.message.get('text')?.value;

    if (!message) return;

    this.connectionsStoreFacadeService.groupDialogAddMessage(this.userToken, this.currentDialogId, message);
    this.message.get('text')?.setValue('');
  }

  public cleanMessageInStore(): void {
    this.connectionsStoreFacadeService.goAwayFromGroup();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private get routeId(): string {
    const routeParams = this.route.snapshot.paramMap;
    const dialogIdFromRoute = routeParams.get('groupId');

    return dialogIdFromRoute ?? '';
  }

  // private getUserName(messages: MessageParams[], people: PeopleParams[]) {

  //   const mesagesSorted = messages.slice();

  //   mesagesSorted.sort((a: MessageParams, b: MessageParams) => +a.createdAt.S - +b.createdAt.S);

  //   mesagesSorted.forEach(message => {

  //     const user = people.find(user => user.uid.S === message.authorID.S)
  //     Object.defineProperty(message, 'author', {value: user?.name}, )
  //             console.log(user)
  //             //if (user) message.authorID.S = user.name.S;
  //             //message.authorID.S
  //           })
  //   return mesagesSorted

  // }
}
