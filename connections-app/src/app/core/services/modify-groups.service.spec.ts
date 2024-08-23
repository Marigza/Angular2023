import { TestBed } from '@angular/core/testing';

import { ModifyGroupsService } from './modify-groups.service';

describe('ModifyGroupsService', () => {
  let service: ModifyGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifyGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
