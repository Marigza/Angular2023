import { Component } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'yta-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  public currentDate = new Date();

  public createCard = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(255)]],
    image: ['', [Validators.required]],
    video: ['', [Validators.required]],
    date: ['', [Validators.required, Validators.maxLength(10), this.dateValidator()]],
  });

  constructor(private formBuilder: NonNullableFormBuilder) {}

  public dateValidator(): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      const inputData = new Date(control.value);
      const deltaTime = Number(this.currentDate) - Number(inputData);

      return deltaTime < 0 ? { dateInFuture: true } : null;
    };
  }

  public resetForm(): void {
    this.createCard.reset();
  }
}
