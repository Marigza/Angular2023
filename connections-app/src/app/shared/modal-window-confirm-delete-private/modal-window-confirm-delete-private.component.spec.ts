import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWindowConfirmDeletePrivateComponent } from './modal-window-confirm-delete-private.component';

describe('ModalWindowConfirmDeletePrivateComponent', () => {
  let component: ModalWindowConfirmDeletePrivateComponent;
  let fixture: ComponentFixture<ModalWindowConfirmDeletePrivateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalWindowConfirmDeletePrivateComponent],
    });
    fixture = TestBed.createComponent(ModalWindowConfirmDeletePrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
