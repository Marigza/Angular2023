import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ItemWithDetails } from '../models/item-with-details.model';
import { SearchItem } from '../models/search-item.model';
import { SearchResponse } from '../models/search-response.model';
import { VideosResponse } from '../models/videos-response.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeHttpService {
  constructor(private http: HttpClient) {}

  public get$(searchValue: string): Observable<ItemWithDetails[]> {
    return this.http
      .get<SearchResponse>('search', {
        params: {
          type: 'video',
          maxResults: 3,
          q: searchValue,
        },
      })
      .pipe(
        map(({ items }) => items),
        switchMap(searchItems => this.getVideos$(...searchItems).pipe(map(({ items }) => items))),
        catchError((err: HttpErrorResponse) => this.handleError$(err))
      );
  }

  public getVideos$(...items: SearchItem[]): Observable<VideosResponse> {
    const id = items.map(item => item.id.videoId).join(',');

    return this.http
      .get<VideosResponse>('videos', {
        params: {
          id,
          part: 'snippet,statistics',
        },
      })
      .pipe(catchError((err: HttpErrorResponse) => this.handleError$(err)));
  }

  /* eslint-disable class-methods-use-this */

  private handleError$(err: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(err.message));
  }

  /* eslint-enable class-methods-use-this */
}
