import { TestBed } from '@angular/core/testing';

import { ActionsWithTokenService } from './actions-with-token.service';

describe('ActionsWithTokenService', () => {
  let service: ActionsWithTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionsWithTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
