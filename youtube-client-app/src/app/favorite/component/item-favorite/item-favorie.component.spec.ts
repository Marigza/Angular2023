import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFavoriteComponent } from './item-favorite.component';

describe('SearchItemComponent', () => {
  let component: ItemFavoriteComponent;
  let fixture: ComponentFixture<ItemFavoriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemFavoriteComponent],
    });
    fixture = TestBed.createComponent(ItemFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
