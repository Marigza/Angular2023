import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { distinctUntilChanged, filter, Subscription, take } from 'rxjs';

import { TokenParams } from '../../core/models/token-params.model';
import { ConnectionsStoreFacadeService } from '../services/connections-store-facade.service';

@Component({
  selector: 'con-modal-window-confirmation',
  templateUrl: './modal-window-confirmation.component.html',
  styleUrls: ['./modal-window-confirmation.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule],
})
export class ModalWindowConfirmationComponent implements OnInit, OnDestroy {
  private userToken: TokenParams | null = null;

  public responseStatusCode$ = this.connectionsStoreFacadeService.responseStatusCode$;

  public subs = new Subscription();

  constructor(
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService,
    private router: Router,
    public dialogRef: MatDialogRef<ModalWindowConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  public ngOnInit(): void {
    this.connectionsStoreFacadeService.selectToken$.pipe(filter(Boolean), take(1)).subscribe(userToken => {
      this.userToken = userToken;
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public delete(): void {
    if (!this.userToken) return;

    this.connectionsStoreFacadeService.deleteGroup(this.userToken, this.data);
    this.responseStatusCode$.pipe(distinctUntilChanged()).subscribe(status => {
      if (status === 200) {
        this.dialogRef.close();
        this.router.navigate(['../../']).catch(({ message }: Error) => message || null);
      }
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
