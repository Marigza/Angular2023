import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class YoutubeInterceptor implements HttpInterceptor {
  private url = `https://youtube.googleapis.com/youtube/v3/`;

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = `${this.url}${request.url}`; // from env
    const updateRequest = request.clone({
      setParams: { key: 'AIzaSyDJhkBMN6u7R12Jp1zoGWxjrq0-2xYafK8' }, // from env
      url,
    });

    return next.handle(updateRequest);
  }
}
