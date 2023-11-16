import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  public required = 'required';

  public minlength = 'minlength';

  public maxlength = 'maxlength';

  public getErrorTitleMessage(control: AbstractControl<string, string> | null): string {
    if (!control?.touched) return '';

    if (control.hasError(this.required)) {
      return 'Please enter a title';
    }

    if (control.hasError(this.minlength)) {
      return 'The title is too short';
    }

    if (control.hasError(this.maxlength)) {
      return 'The title is too long';
    }

    return '';
  }

  public getErrorDescriptionMessage(control: AbstractControl<string, string> | null): string {
    if (!control?.touched) return '';

    return control?.hasError(this.maxlength) ? 'The description is too long' : '';
  }

  public getErrorImageMessage(control: AbstractControl<string, string> | null): string {
    if (!control?.touched) return '';

    return control?.hasError(this.required) ? `Please enter a link to the image` : '';
  }

  public getErrorVideoMessage(control: AbstractControl<string, string> | null): string {
    if (!control?.touched) return '';

    return control?.hasError(this.required) ? `Please enter a link to the video` : '';
  }

  public getErrorDateMessage(control: AbstractControl<string, string> | null): string {
    if (!control?.touched) return '';

    if (control?.hasError(this.required)) return 'Please enter a creation date';

    return control?.errors ? 'The date is invalid' : '';
  }
}
