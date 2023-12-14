import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { filter, map, Subscription, tap } from 'rxjs';

import { ConnectionsStoreFacadeService } from '../services/connections-store-facade.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'con-modal-window-create',
  templateUrl: './modal-window-create.component.html',
  styleUrls: ['./modal-window-create.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class ModalWindowCreateComponent {
  public createGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(30), this.characterValidator()]],
  });

  public regExpChar = '(?=.*[!@#$%()\'<>|"+=-_.,;:/^&*])'; // TODO неправильно отрабатывает валидатор

  public subs = new Subscription();

  constructor(
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService,
    private formBuilder: NonNullableFormBuilder,
    public dialogRef: MatDialogRef<ModalWindowCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public create(): void {
    const name = this.createGroup.get('name')?.value;

    if (name) {
      this.subs.add(
        this.connectionsStoreFacadeService.selectToken$
          .pipe(
            filter(token => token !== null),
            map(token => {
              token && this.connectionsStoreFacadeService.createGroup(token, name);
            }),
            tap(() => {
              this.dialogRef.close();
            })
          )
          .subscribe(data => data)
      ); // TODO убрать подписку куда-нибудь... с глаз долой
    }
  }

  public characterValidator(): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      const inputName = control.value;

      return inputName.match(this.regExpChar) ? { noChar: true } : null;
    };
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
