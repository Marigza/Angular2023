import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateValidator(control: AbstractControl<string>): ValidationErrors | null {
  const value = new Date(control.value);
  const timeNow = new Date();
  const deltaTime = Number(timeNow) - Number(value);

  if (deltaTime < 0) {
    return { date: true, requiredValue: 'The date is invalid' };
  }

  return null;
}
