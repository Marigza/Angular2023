import { TestBed } from '@angular/core/testing';

import { CardsStateService } from './cards-state.service';

describe('CardsStateService', () => {
  let service: CardsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
