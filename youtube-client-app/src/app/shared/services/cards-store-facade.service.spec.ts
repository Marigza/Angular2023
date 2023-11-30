import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { CardsStoreFacadeService } from './cards-store-facade.service';

describe('CardsStoreFacadeService', () => {
  let service: CardsStoreFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot()],
    });
    service = TestBed.inject(CardsStoreFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
