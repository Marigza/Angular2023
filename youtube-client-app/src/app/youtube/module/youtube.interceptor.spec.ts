import { TestBed } from '@angular/core/testing';

import { YoutubeInterceptor } from './youtube.interceptor';

describe('YoutubeInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [YoutubeInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: YoutubeInterceptor = TestBed.inject(YoutubeInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
