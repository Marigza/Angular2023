import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ActionsWithTokenService } from './actions-with-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn = this.actionsWithTokenService.hasToken();

  public logState$ = new BehaviorSubject<boolean>(this.isLoggedIn);

  constructor(private actionsWithTokenService: ActionsWithTokenService) {}

  public login(login: string): void {
    this.actionsWithTokenService.setToken(login);
    this.isLoggedIn = true;
    this.logState$.next(true);
  }

  public logout(): void {
    this.actionsWithTokenService.removeToken();
    this.isLoggedIn = false;
    this.logState$.next(false);
  }
}
