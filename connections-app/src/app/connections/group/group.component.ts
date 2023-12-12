import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { exhaustMap, filter, map, Subscription } from 'rxjs';

import { GroupParams } from '../../core/models/group-params.model';
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

  public isLoad$ = this.connectionsStoreFacadeService.isLoading$;

  public owner = localStorage.getItem('uid');

  public timer = 60; // observable + timer

  public subs = new Subscription();

  constructor(
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.subs.add(
      this.connectionsStoreFacadeService.selectGroups$
        .pipe(
          filter(groupsParams => groupsParams.length === 0),
          exhaustMap(() => this.connectionsStoreFacadeService.selectToken$),
          map(token => {
            token && this.connectionsStoreFacadeService.groupsRequestSend(token);
          })
        )
        .subscribe(data => data)
    );
  }

  public update(): void {
    this.subs.add(
      this.connectionsStoreFacadeService.selectToken$
        .pipe(
          map(token => {
            token && this.connectionsStoreFacadeService.groupsUpdate(token);
          })
        )
        .subscribe(data => data)
    );
  }

  public openModal(): void {
    this.dialog.open(ModalWindowCreateComponent);
  }

  public deleteGroup(group: string): void {
    this.dialog.open(ModalWindowConfirmationComponent, {
      data: group,
    });
  }

  /* eslint-disable class-methods-use-this */

  public trackByIndex(index: number, item: GroupParams): string {
    return item.id.S;
  }

  /* eslint-enable class-methods-use-this */

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
