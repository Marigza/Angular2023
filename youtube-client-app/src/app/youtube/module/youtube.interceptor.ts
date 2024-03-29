import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class YoutubeInterceptor implements HttpInterceptor {
  private apiKey = environment.API_KEY;

  private apiUrl = environment.URL_YOUTUBE;

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = `${this.apiUrl}${request.url}`;
    const updateRequest = request.clone({
      setParams: { key: this.apiKey },
      url,
    });

    return next.handle(updateRequest);
  }
}
