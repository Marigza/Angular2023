import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActionsWithTokenService {
  public key = 'fakeToken';

  public setToken(login: string, password: string): void {
    localStorage.setItem(this.key, `${login}:${password}`);
  }

  public removeToken(): void {
    localStorage.removeItem(this.key);
  }

  public hasToken(): boolean {
    const value = localStorage.getItem(this.key);

    return !!value;
  }
}
