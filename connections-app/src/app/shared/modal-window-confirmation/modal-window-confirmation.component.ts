import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { filter, map, tap } from 'rxjs';

import { ConnectionsStoreFacadeService } from '../services/connections-store-facade.service';

@Component({
  selector: 'con-modal-window-confirmation',
  templateUrl: './modal-window-confirmation.component.html',
  styleUrls: ['./modal-window-confirmation.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule],
})
export class ModalWindowConfirmationComponent {
  constructor(
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService,
    public dialogRef: MatDialogRef<ModalWindowConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public delete(): void {
    console.log('deleting...', this.data);

    this.connectionsStoreFacadeService.selectToken$
      .pipe(
        filter(token => token !== null),
        map(token => {
          token && this.connectionsStoreFacadeService.deleteGroup(token, this.data);
        }),
        tap(() => {
          this.dialogRef.close();
        })
      )
      .subscribe(data => data); // TODO убрать подписку куда-нибудь... с глаз долой
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
