import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { CardsStateService } from './cards-state.service';

describe('CardsStateService', () => {
  let service: CardsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot()],
    });
    service = TestBed.inject(CardsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
