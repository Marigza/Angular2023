import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { ErrorResponseObject } from '../models/error-response-object.model';
import { GroupCreate } from '../models/group-create-response.model';
import { LoginParams } from '../models/login-params.model';
import { ProfileParams } from '../models/profile-params.model';
import { RegisterParams } from '../models/register-params.model';
import { ResponseGroups } from '../models/response-groups.model';
import { ResponseLogin } from '../models/response-login.model';
import { ResponsePeople } from '../models/response-people.model';
import { TokenParams } from '../models/token-params.model';

@Injectable({
  providedIn: 'root',
})
export class ConnectionsHttpService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  public registerPost$(registerParams: RegisterParams): Observable<HttpStatusCode> {
    return this.http
      .post<HttpStatusCode>('registration', JSON.stringify(registerParams), {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(
        tap(() => this.snackBar.open('success registration!', undefined, { duration: 3000 })),
        catchError((err: HttpErrorResponse) => this.handleError$(err))
      );
  }

  public loginPost$(loginParams: LoginParams): Observable<ResponseLogin> {
    return this.http
      .post<ResponseLogin>('login', JSON.stringify(loginParams), { headers: { 'content-type': 'application/json' } })
      .pipe(
        tap(() => this.snackBar.open('login success', undefined, { duration: 3000 })),
        catchError((err: HttpErrorResponse) => this.handleError$(err))
      );
  }

  public getProfile$(tokenParams: TokenParams): Observable<ProfileParams> {
    return this.http
      .get<ProfileParams>('profile', {
        headers: {
          'rs-uid': tokenParams.uid,
          'rs-email': tokenParams.email,
          Authorization: `Bearer ${tokenParams.token}`,
        },
      })
      .pipe(catchError((err: HttpErrorResponse) => this.handleError$(err)));
  }

  public updateProfile$(tokenParams: TokenParams, name: string): Observable<HttpStatusCode> {
    return this.http
      .put<HttpStatusCode>(
        'profile',
        { name },
        {
          headers: {
            'rs-uid': tokenParams.uid,
            'rs-email': tokenParams.email,
            Authorization: `Bearer ${tokenParams.token}`,
          },
        }
      )
      .pipe(
        tap(() => this.snackBar.open('profile update successfully', undefined, { duration: 3000 })),
        catchError((err: HttpErrorResponse) => this.handleError$(err))
      );
  }

  public getGroups$(tokenParams: TokenParams): Observable<ResponseGroups> {
    return this.http
      .get<ResponseGroups>('groups/list', {
        headers: {
          'rs-uid': tokenParams.uid,
          'rs-email': tokenParams.email,
          Authorization: `Bearer ${tokenParams.token}`,
        },
      })
      .pipe(catchError((err: HttpErrorResponse) => this.handleError$(err)));
  }

  public createGroup$(tokenParams: TokenParams, name: string): Observable<GroupCreate> {
    return this.http
      .post<GroupCreate>(
        'groups/create',
        { name },
        {
          headers: {
            'rs-uid': tokenParams.uid,
            'rs-email': tokenParams.email,
            Authorization: `Bearer ${tokenParams.token}`,
          },
        }
      )
      .pipe(
        tap(() => this.snackBar.open(`group ${name} add successfully`, undefined, { duration: 3000 })),
        catchError((err: HttpErrorResponse) => this.handleError$(err))
      );
  }

  public deleteGroup$(tokenParams: TokenParams, groupId: string): Observable<HttpStatusCode> {
    return this.http
      .delete<HttpStatusCode>(`groups/delete?groupID={:${groupId}}`, {
        headers: {
          'rs-uid': tokenParams.uid,
          'rs-email': tokenParams.email,
          Authorization: `Bearer ${tokenParams.token}`,
        },
      })
      .pipe(
        tap(() => this.snackBar.open(`group ${groupId} delete successfully`, undefined, { duration: 3000 })),
        catchError((err: HttpErrorResponse) => this.handleError$(err))
      );
  }

  public getPeople$(tokenParams: TokenParams): Observable<ResponsePeople> {
    return this.http
      .get<ResponsePeople>('users', {
        headers: {
          'rs-uid': tokenParams.uid,
          'rs-email': tokenParams.email,
          Authorization: `Bearer ${tokenParams.token}`,
        },
      })
      .pipe(catchError((err: HttpErrorResponse) => this.handleError$(err)));
  }

  public logout$(tokenParams: TokenParams): Observable<HttpStatusCode> {
    return this.http
      .delete<HttpStatusCode>('logout', {
        headers: {
          'rs-uid': tokenParams.uid,
          'rs-email': tokenParams.email,
          Authorization: `Bearer ${tokenParams.token}`,
        },
      })
      .pipe(
        tap(() => this.snackBar.open('user is logged out', undefined, { duration: 3000 })),
        catchError((err: HttpErrorResponse) => this.handleError$(err))
      );
  }

  /* eslint-disable class-methods-use-this */

  private handleError$(err: HttpErrorResponse): Observable<never> {
    const errorResponse = err.error as ErrorResponseObject;
    this.snackBar.open(errorResponse.message, undefined, { duration: 3000 });

    return throwError(() => new Error(err.message));
  }

  /* eslint-enable class-methods-use-this */
}
