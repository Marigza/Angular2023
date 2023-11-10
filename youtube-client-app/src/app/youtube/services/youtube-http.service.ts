import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SearchItem } from '../models/search-item.model';
import { SearchResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeHttpService {
  private apiKey = 'AIzaSyDJhkBMN6u7R12Jp1zoGWxjrq0-2xYafK8';

  constructor(private http: HttpClient) {}

  public get(target: string): Observable<SearchResponse> {
    return this.http
      .get<SearchResponse>(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${target}&key=${this.apiKey}`
      )
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  public getVideos(...items: SearchItem[]): Observable<SearchResponse> {
    const videoIdArr = items.map(item => item.id.videoId).join(',');

    return this.http
      .get<SearchResponse>(
        `https://www.googleapis.com/youtube/v3/videos?key=${this.apiKey}&id=${videoIdArr}&part=snippet,statistics`
      )
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  /* eslint-disable class-methods-use-this */

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(err.message));
  }

  /* eslint-enable class-methods-use-this */
}
