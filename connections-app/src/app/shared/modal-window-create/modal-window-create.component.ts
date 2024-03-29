import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
import { distinctUntilChanged, filter, Subscription, take } from 'rxjs';

import { TokenParams } from '../../core/models/token-params.model';
import { ConnectionsStoreFacadeService } from '../services/connections-store-facade.service';

@Component({
  selector: 'con-modal-window-create',
  templateUrl: './modal-window-create.component.html',
  styleUrls: ['./modal-window-create.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class ModalWindowCreateComponent implements OnInit, OnDestroy {
  public isDisabled$ = this.connectionsStoreFacadeService.isLoading$;

  public responseStatusCode$ = this.connectionsStoreFacadeService.responseStatusCode$;

  public createGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(30), this.characterValidator()]],
  });

  public regExpChar = '(^.*[^ A-zА-яЁё0-9].*$)';

  public subs = new Subscription();

  private userToken: TokenParams | null = null;

  constructor(
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService,
    private formBuilder: NonNullableFormBuilder,
    public dialogRef: MatDialogRef<ModalWindowCreateComponent>,
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

  public create(): void {
    const name = this.createGroup.get('name')?.value;

    if (!this.userToken) return;

    if (name) this.connectionsStoreFacadeService.createGroup(this.userToken, name);

    this.subs.add(
      this.responseStatusCode$.pipe(distinctUntilChanged()).subscribe(status => {
        if (status === 200) this.dialogRef.close();
      })
    );
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
