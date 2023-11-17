import { Component } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { passwordValidator } from '../../shared/validators/password.validator';
import { AuthService } from '../services/auth.service';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'yta-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  public canVisiblePassword = true;

  public visibleIcon: 'visibility_off' | 'visibility' = 'visibility_off';

  public login = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator]],
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: NonNullableFormBuilder,
    private validationService: ValidationService
  ) {}

  public async onSubmit(): Promise<void> {
    if (this.login.valid) {
      this.emailFormField?.value && this.authService.login(this.emailFormField?.value);
      await this.router.navigate(['/youtube']);
    }
  }

  public getErrorEmailMessage(): string {
    return this.validationService.getErrorEmailMessage(this.emailFormField);
  }

  public getErrorPasswordMessage(): string {
    return this.validationService.getErrorPasswordMessage(this.passwordFormField);
  }

  public showPassword(): void {
    this.canVisiblePassword ? (this.visibleIcon = 'visibility_off') : (this.visibleIcon = 'visibility');
    this.canVisiblePassword = !this.canVisiblePassword;
  }

  private get passwordFormField(): AbstractControl<string> | null {
    return this.login.get('password');
  }

  private get emailFormField(): AbstractControl<string> | null {
    return this.login.get('email');
  }
}
