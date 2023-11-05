import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeHttpService {
  constructor(private http: HttpClient) {}

  public get(): Observable<SearchResponse> {
    return this.http.get<SearchResponse>('assets/data.json'); // добавить обработку ошибок catchError...of
  }
}
