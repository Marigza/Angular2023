import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { dateValidator } from '../../../shared/validators/date.validator';

@Component({
  selector: 'yta-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  public createCard = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(255)]],
    image: ['', [Validators.required]],
    video: ['', [Validators.required]],
    date: ['', [Validators.required, Validators.maxLength(10), dateValidator]],
  });

  constructor(private formBuilder: FormBuilder) {}

  public getErrorTitleMessage(): string {
    if (!this.createCard.get('title')?.touched) return '';

    if (this.createCard.get('title')?.hasError('required')) {
      return 'Please enter a title';
    }

    if (this.createCard.get('date')?.hasError('minLength(3)')) {
      return 'The title is too short';
    }

    return this.createCard.get('date')?.hasError('maxLength(20)') ? '' : 'The title is too long';
  }

  public getErrorDescriptionMessage(): string {
    if (!this.createCard.get('description')?.touched) return '';

    return this.createCard.get('description')?.hasError('maxLength(255)') ? '' : 'The description is too long';
  }

  public getErrorSourceMessage(source: string): string {
    if (!this.createCard.get(source)?.touched) return '';

    return this.createCard.get(source)?.hasError('required') ? `Please enter a link to the ${source}` : '';
  }

  public getErrorDateMessage(): string {
    if (!this.createCard.get('date')?.touched) return '';

    if (this.createCard.get('date')?.hasError('required')) return 'Please enter a creation date';

    return this.createCard.get('date')?.errors ? 'The date is invalid' : '';
  }

  public resetForm(): void {
    this.createCard.reset();
  }
}
