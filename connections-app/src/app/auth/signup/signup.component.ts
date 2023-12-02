import { Component } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'con-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public canVisiblePassword = true;

  public visibleIcon: 'visibility_off' | 'visibility' = 'visibility_off';

  public regExpUpperCase = '^(?=.*[A-Z])';

  public regExpDigit = '(.*[0-9].*)';

  public regExpChar = '(?=.*[!@#$%^&*])';

  public login = this.formBuilder.group({
    name: ['', [Validators.required]],
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
    // private router: Router,
    // private authService: AuthService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  // public async onSubmit(): Promise<void> {
  //   this.emailFormField?.value && this.authService.login(this.emailFormField?.value);
  //   await this.router.navigate(['/youtube']);
  // }

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
