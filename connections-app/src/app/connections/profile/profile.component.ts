import { Component } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'con-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public canRedact = false;

  public profile = this.formBuilder.group({
    name: ['', [Validators.required]],
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

  public toggleRedact(): void {
    this.canRedact = !this.canRedact;
  }

  private get emailFormField(): AbstractControl<string> | null {
    return this.profile.get('email');
  }
}
