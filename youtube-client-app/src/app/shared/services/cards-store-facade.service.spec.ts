import { TestBed } from '@angular/core/testing';

import { CardsStoreFacadeService } from './cards-store-facade.service';

describe('CardsStoreFacadeService', () => {
  let service: CardsStoreFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsStoreFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
