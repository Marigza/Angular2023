import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ActionsWithTokenService } from '../services/actions-with-token.service';

@Component({
  selector: 'yta-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  public loginControl = new FormControl('');

  public passwordControl = new FormControl('');

  constructor(private actionsWithTokenService: ActionsWithTokenService) {}

  public onSubmit(): void {
    this.loginControl.value &&
      this.passwordControl.value &&
      this.actionsWithTokenService.setToken(this.loginControl.value, this.passwordControl.value);
  }
}
