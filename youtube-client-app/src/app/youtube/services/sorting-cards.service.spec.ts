import { TestBed } from '@angular/core/testing';

import { SortingCardsService } from './sorting-cards.service';

describe('SortingCardsService', () => {
  let service: SortingCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
