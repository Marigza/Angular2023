import { TestBed } from '@angular/core/testing';

import { ModifyServerDataService } from './modify-groups.service';

describe('ModifyGroupsService', () => {
  let service: ModifyServerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifyServerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
