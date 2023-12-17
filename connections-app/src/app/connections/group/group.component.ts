import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { exhaustMap, filter, map, Subscription, take } from 'rxjs';

import { GroupParams } from '../../core/models/group-params.model';
import { TokenParams } from '../../core/models/token-params.model';
import { ModalWindowConfirmationComponent } from '../../shared/modal-window-confirmation/modal-window-confirmation.component';
import { ModalWindowCreateComponent } from '../../shared/modal-window-create/modal-window-create.component';
import { ConnectionsStoreFacadeService } from '../../shared/services/connections-store-facade.service';

@Component({
  selector: 'con-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit, OnDestroy {
  public groups$ = this.connectionsStoreFacadeService.selectGroups$;

  public isLoad$ = this.connectionsStoreFacadeService.isLoading$.pipe(
    exhaustMap(() => this.connectionsStoreFacadeService.selectIsTimerGroupsLoading$)
  );

  public owner = localStorage.getItem('uid');

  public timer$ = this.connectionsStoreFacadeService.timerGroups$;

  public subs = new Subscription();

  private userToken: TokenParams | null = null;

  constructor(
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.connectionsStoreFacadeService.selectToken$.pipe(take(1)).subscribe(userToken => {
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
  }

  public onUpdateGroups(): void {
    if (!this.userToken) return;
    this.connectionsStoreFacadeService.groupsUpdate(this.userToken);
  }

  public openCreateModal(): void {
    this.dialog.open(ModalWindowCreateComponent);
  }

  public openDeleteModal(group: string): void {
    this.dialog.open(ModalWindowConfirmationComponent, {
      data: group,
    });
  }

  /* eslint-disable class-methods-use-this */

  public trackByIndex(_: number, item: GroupParams): string {
    return item.id.S;
  }

  /* eslint-enable class-methods-use-this */

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
