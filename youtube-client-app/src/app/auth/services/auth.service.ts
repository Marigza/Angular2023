import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ActionsWithTokenService } from './actions-with-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn = this.actionsWithTokenService.hasToken();

  public redirectUrl: string | null = null;

  public logState$ = new BehaviorSubject<boolean>(this.isLoggedIn);

  constructor(private actionsWithTokenService: ActionsWithTokenService) {}

  public login(login: string): void {
    this.actionsWithTokenService.setToken(login);
    this.logState$.next(true);
    this.logStateChanges();
  }

  public logout(): void {
    this.actionsWithTokenService.removeToken();
    this.logState$.next(false);
    this.logStateChanges();
  }

  public logStateChanges(): void {
    this.logState$.subscribe(booleanValue => {
      this.isLoggedIn = booleanValue;
    });
  }
}
