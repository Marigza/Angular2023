import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { ConnectionsStoreFacadeService } from '../../shared/services/connections-store-facade.service';

@Component({
  selector: 'con-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class SignupComponent {
  public canVisiblePassword = true;

  public isLoaded$ = this.connectionsStoreFacadeService.isLoading$;

  public visibleIcon: 'visibility_off' | 'visibility' = 'visibility_off';

  public regExpUpperCase = '^(?=.*[A-Z])';

  public regExpDigit = '(.*[0-9].*)';

  public regExpChar = '(?=.*[!@#$%^&*])';

  public regExpAnyChar = '(^.*[^ A-zА-яЁё].*$)';

  public registration = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(40), this.anyCharValidator()]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        this.upperCaseValidator(),
        this.digitValidator(),
        this.characterValidator(),
      ],
    ],
  });

  constructor(
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  public onSubmit(): void {
    if (this.registration.valid) {
      const registParam = {
        name: this.registration.get('name')?.value ?? '',
        email: this.registration.get('email')?.value ?? '',
        password: this.registration.get('password')?.value ?? '',
      };
      this.connectionsStoreFacadeService.registrationRequestSend(registParam);
    }
  }

  public upperCaseValidator(): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      const inputPassword = control.value;

      return inputPassword.match(this.regExpUpperCase) ? null : { noUpperCase: true };
    };
  }

  public digitValidator(): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      const inputPassword = control.value;

      return inputPassword.match(this.regExpDigit) ? null : { noDigit: true };
    };
  }

  public characterValidator(): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      const inputPassword = control.value;

      return inputPassword.match(this.regExpChar) ? null : { noChar: true };
    };
  }

  public anyCharValidator(): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      const inputName = control.value;

      return inputName.match(this.regExpAnyChar) ? { name: true } : null;
    };
  }

  public changePasswordVisibility(): void {
    this.canVisiblePassword ? (this.visibleIcon = 'visibility') : (this.visibleIcon = 'visibility_off');
    this.canVisiblePassword = !this.canVisiblePassword;
  }
}
