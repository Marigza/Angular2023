import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SearchResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeHttpService {
  constructor(private http: HttpClient) {}

  public get(): Observable<SearchResponse> {
    return this.http
      .get<SearchResponse>('assets/data.json')
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  /* eslint-disable class-methods-use-this */

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(err.message));
  }

  /* eslint-enable class-methods-use-this */
}
