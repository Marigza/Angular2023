import { TestBed } from '@angular/core/testing';

import { FilterSorterService } from './filter-sorter.service';

describe('FilterSorterService', () => {
  let service: FilterSorterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterSorterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
