import { TestBed } from '@angular/core/testing';

import { FilterByValueService } from './filter-by-value.service';

describe('FilterByValueService', () => {
  let service: FilterByValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterByValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
