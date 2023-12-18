import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { filter, take } from 'rxjs';

import { TokenParams } from '../../core/models/token-params.model';
import { ConnectionsStoreFacadeService } from '../services/connections-store-facade.service';

@Component({
  selector: 'con-modal-window-confirmation',
  templateUrl: './modal-window-confirmation.component.html',
  styleUrls: ['./modal-window-confirmation.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule],
})
export class ModalWindowConfirmationComponent implements OnInit {
  private userToken: TokenParams | null = null;

  constructor(
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService,
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
    this.dialogRef.close();
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
