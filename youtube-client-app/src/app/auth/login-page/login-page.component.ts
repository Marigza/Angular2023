import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ActionsWithTokenService } from '../services/actions-with-token.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'yta-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  public loginControl = new FormControl('');

  public passwordControl = new FormControl('');

  constructor(
    private router: Router,
    private actionsWithTokenService: ActionsWithTokenService,
    private authService: AuthService
  ) {}

  public async onSubmit(): Promise<void> {
    if (this.loginControl.value && this.passwordControl.value) {
      this.actionsWithTokenService.setToken(this.loginControl.value);
      this.authService.login();
      await this.router.navigate(['/youtube']);
    }
  }
}
