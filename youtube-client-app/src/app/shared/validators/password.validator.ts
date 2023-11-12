import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value);

  if (!value.match('^(?=.*[A-Z])')) {
    return { password: true, requiredValue: 'At least uppercase letter.' };
  }

  if (!value.match('(?=.*[a-z])')) {
    return { password: true, requiredValue: 'At least one lowercase letter.' };
  }

  if (!value.match('(.*[0-9].*)')) {
    return { password: true, requiredValue: 'At least one digit.' };
  }

  if (!value.match('(?=.*[!@#$%^&*])')) {
    return { password: true, requiredValue: 'At least one special character.' };
  }

  if (!value.match('.{8,}')) {
    return { password: true, requiredValue: 'At least 8 characters.' };
  }

  return null;
}
