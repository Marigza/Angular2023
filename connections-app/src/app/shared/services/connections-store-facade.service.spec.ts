import { TestBed } from '@angular/core/testing';

import { ConnectionsStoreFacadeService } from './connections-store-facade.service';

describe('ConnectionsStoreFacadeService', () => {
  let service: ConnectionsStoreFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionsStoreFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
