import { TestBed } from '@angular/core/testing';

import { ConnectionsHttpService } from './connections-http.service';

describe('ConnectionsHttpService', () => {
  let service: ConnectionsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
