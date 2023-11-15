import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  public required = 'required';

  public getErrorEmailMessage(control: AbstractControl<string, string> | null): string {
    if (control?.hasError(this.required)) {
      return 'Please enter a login email';
    }

    return control?.hasError('email') ? 'The login email is invalid' : '';
  }

  public getErrorPasswordMessage(control: AbstractControl<string, string> | null): string {
    if (control?.hasError(this.required)) {
      return 'Please enter a password';
    }

    return control?.errors ? `Your password is not strong enough: ${control?.errors['requiredValue']}` : '';
  }
}
