import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWindowConfirmationComponent } from './modal-window-confirmation.component';

describe('ModalWindowConfirmationComponent', () => {
  let component: ModalWindowConfirmationComponent;
  let fixture: ComponentFixture<ModalWindowConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalWindowConfirmationComponent],
    });
    fixture = TestBed.createComponent(ModalWindowConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
