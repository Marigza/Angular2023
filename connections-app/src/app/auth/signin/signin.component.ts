import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

import { LoginParams } from '../../core/models/login-params.model';
import { ConnectionsStoreFacadeService } from '../../shared/services/connections-store-facade.service';

@Component({
  selector: 'con-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  public canVisiblePassword = false;

  public visibleIcon: 'visibility_off' | 'visibility' = 'visibility_off';

  public login = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public isLoaded$ = this.connectionsStoreFacadeService.isLoading$;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService
  ) {}

  public onSubmit(): void {
    if (this.login.valid) {
      const loginParams: LoginParams = {
        email: this.login.get('email')?.value ?? '',
        password: this.login.get('password')?.value ?? '',
      };
      this.connectionsStoreFacadeService.loginRequestSend(loginParams);
    }
  }

  public changePasswordVisibility(): void {
    this.canVisiblePassword ? (this.visibleIcon = 'visibility') : (this.visibleIcon = 'visibility_off');
    this.canVisiblePassword = !this.canVisiblePassword;
  }
}
