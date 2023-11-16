import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

import { dateValidator } from '../../../shared/validators/date.validator';
import { ValidationService } from '../../services/validation.service';

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

  public arrayFields = [
    {
      label: 'title',
      errorMessage: (): string => this.validationService.getErrorTitleMessage(this.createCard.get('title')),
      requiered: true,
      type: 'text',
    },
    {
      label: 'description',
      errorMessage: (): string => this.validationService.getErrorDescriptionMessage(this.createCard.get('description')),
      requiered: false,
      type: 'text',
    },
    {
      label: 'image',
      errorMessage: (): string => this.validationService.getErrorImageMessage(this.createCard.get('image')),
      requiered: true,
      type: 'text',
    },
    {
      label: 'video',
      errorMessage: (): string => this.validationService.getErrorVideoMessage(this.createCard.get('video')),
      requiered: true,
      type: 'text',
    },
    {
      label: 'date',
      errorMessage: (): string => this.validationService.getErrorDateMessage(this.createCard.get('date')),
      requiered: true,
      type: 'date',
    },
  ];

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private validationService: ValidationService
  ) {}

  public resetForm(): void {
    this.createCard.reset();
  }

  /* eslint-disable class-methods-use-this */

  public trackByIndex(index: number): number {
    return index;
  }

  /* eslint-enable class-methods-use-this */
}
