import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class HttpConnectionsInterceptor implements HttpInterceptor {
  private apiUrl = environment.URL_CONNECTIONS;

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = `${this.apiUrl}${request.url}`;
    const updateRequest = request.clone({
      url,
    });

    return next.handle(updateRequest);
  }
}
