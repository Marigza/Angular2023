import { TestBed } from '@angular/core/testing';

import { DataFromHttpService } from './data-from-http.service';

describe('DataFromHttpService', () => {
  let service: DataFromHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFromHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
