import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWindowCreateComponent } from './modal-window-create.component';

describe('ModalWindowCreateComponent', () => {
  let component: ModalWindowCreateComponent;
  let fixture: ComponentFixture<ModalWindowCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalWindowCreateComponent],
    });
    fixture = TestBed.createComponent(ModalWindowCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
