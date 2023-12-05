import { Component } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { LoginParams } from '../../core/models/login-params.model';
import { ConnectionsHttpService } from '../../core/services/connections-http.service';

@Component({
  selector: 'con-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  public canVisiblePassword = true;

  public visibleIcon: 'visibility_off' | 'visibility' = 'visibility_off';

  public regExpUpperCase = '^(?=.*[A-Z])';

  public regExpDigit = '(.*[0-9].*)';

  public regExpChar = '(?=.*[!@#$%^&*])';

  public login = this.formBuilder.group({
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
    private connectionsHttpService: ConnectionsHttpService,
    // private router: Router,
    // private authService: AuthService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  // public async onSubmit(): Promise<void> {
  //   this.emailFormField?.value && this.authService.login(this.emailFormField?.value);
  //   await this.router.navigate(['/youtube']);
  // }
  public onSubmit(): void {
    if (this.login.valid) {
      const loginParams: LoginParams = {
        email: this.login.get('email')?.value ?? '',
        password: this.login.get('password')?.value ?? '',
      };
      this.connectionsHttpService.loginPost$(loginParams).subscribe(response => response);
      // убрать эту бобуйню
      // console.log(JSON.stringify(response));
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

  public changePasswordVisibility(): void {
    this.canVisiblePassword ? (this.visibleIcon = 'visibility') : (this.visibleIcon = 'visibility_off');
    this.canVisiblePassword = !this.canVisiblePassword;
  }

  private get emailFormField(): AbstractControl<string> | null {
    return this.login.get('email');
  }
}
