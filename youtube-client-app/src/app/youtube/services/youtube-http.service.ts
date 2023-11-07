import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SearchResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeHttpService {
  constructor(private http: HttpClient) {}

  public get(): Observable<SearchResponse> {
    return this.http.get<SearchResponse>('assets/data.json').pipe(catchError(this.handleError<SearchResponse>('get')));
  }

  /* eslint-disable class-methods-use-this, no-alert */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(error);
      alert(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  /* eslint-enable class-methods-use-this,  no-alert */
}
