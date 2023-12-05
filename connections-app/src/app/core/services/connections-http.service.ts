import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoginParams } from '../models/login-params.model';
import { RegisterParams } from '../models/register-params.model';
import { TokenParams } from '../models/token-params.model';

@Injectable({
  providedIn: 'root',
})
export class ConnectionsHttpService {
  constructor(private http: HttpClient) {}

  public registerPost$(registerParams: RegisterParams): Observable<RegisterParams> {
    return this.http
      .post<RegisterParams>('registration', JSON.stringify(registerParams), {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(catchError((err: HttpErrorResponse) => this.handleError$(err)));
  }

  public loginPost$(loginParams: LoginParams): Observable<LoginParams> {
    return this.http
      .post<LoginParams>('login', JSON.stringify(loginParams), { headers: { 'content-type': 'application/json' } })
      .pipe(catchError((err: HttpErrorResponse) => this.handleError$(err)));
  }

  public getProfile$(tokenParams: TokenParams): Observable<TokenParams> {
    return this.http
      .get<TokenParams>('profile', {
        headers: {
          'rs-uid': tokenParams['rs-uid'],
          'rs-email': tokenParams['rs-email'],
          Authorization: `Bearer ${tokenParams.Authorization}`,
        },
      })
      .pipe(catchError((err: HttpErrorResponse) => this.handleError$(err)));
  }

  public getGroups$(tokenParams: TokenParams): Observable<TokenParams> {
    return this.http
      .get<TokenParams>('groups/list', {
        headers: {
          'rs-uid': tokenParams['rs-uid'],
          'rs-email': tokenParams['rs-email'],
          Authorization: `Bearer ${tokenParams.Authorization}`,
        },
      })
      .pipe(catchError((err: HttpErrorResponse) => this.handleError$(err)));
  }

  /* eslint-disable class-methods-use-this */

  private handleError$(err: HttpErrorResponse): Observable<never> {
    // console.log(err.error);

    return throwError(() => new Error(err.message));
  }

  /* eslint-enable class-methods-use-this */
}
