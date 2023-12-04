import { TestBed } from '@angular/core/testing';

import { HttpConnectionsInterceptor } from './http-connections.interceptor';

describe('HttpConnectionsInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpConnectionsInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: HttpConnectionsInterceptor = TestBed.inject(HttpConnectionsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
