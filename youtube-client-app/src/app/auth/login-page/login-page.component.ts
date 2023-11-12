import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { passwordValidator } from '../../shared/validators/password.validator';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'yta-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  public isHide = true;

  public login = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator]],
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  public async onSubmit(): Promise<void> {

    if (this.loginValue && this.passValue) {
      this.authService.login(this.loginValue);
      await this.router.navigate(['/youtube']);
    }
  }

  public get loginValue(): string | null | undefined {
    if (this.emailFormField?.valid) {
      return this.emailFormField?.value;
    }

    return undefined;
  }

  public get passValue(): string | null | undefined {
    if (this.passwordFormField?.valid) {
      return this.passwordFormField?.value;
    }

    return undefined;
  }

  public getErrorEmailMessage(): string {
    if (this.emailFormField?.hasError('required')) {
      return 'Please enter a login email';
    }

    return this.emailFormField?.hasError('email') ? 'The login email is invalid' : '';
  }

  public getErrorPasswordMessage(): string {
    if (this.passwordFormField?.hasError('required')) {
      return 'Please enter a password';
    }

    return this.passwordFormField?.errors
      ? `Your password is not strong enough: ${this.passwordFormField?.errors['requiredValue']}`
      : '';
  }

  private get passwordFormField(): AbstractControl<string | null, string | null> | null {
    return this.login.get('password');
  }

  private get emailFormField(): AbstractControl<string | null, string | null> | null {
    return this.login.get('email');
  }
}
