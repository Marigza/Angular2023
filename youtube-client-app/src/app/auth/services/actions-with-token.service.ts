import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActionsWithTokenService {
  public storageToken = 'userToken';

  public setToken(login: string): void {
    localStorage.setItem(this.storageToken, login);
  }

  public removeToken(): void {
    localStorage.removeItem(this.storageToken);
  }

  public hasToken(): boolean {
    const value = localStorage.getItem(this.storageToken);

    return !!value;
  }
}
