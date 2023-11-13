import { Injectable } from '@angular/core';

import { ActionsWithTokenService } from './actions-with-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn = this.actionsWithTokenService.hasToken();

  public redirectUrl: string | null = null;

  constructor(private actionsWithTokenService: ActionsWithTokenService) {}

  public login(): void {
    this.isLoggedIn = true;
  }

  public logout(): void {
    this.isLoggedIn = false;
  }
}
