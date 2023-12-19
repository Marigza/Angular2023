import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionsBlockComponent } from './connections-block.component';

describe('ConnectionsBlockComponent', () => {
  let component: ConnectionsBlockComponent;
  let fixture: ComponentFixture<ConnectionsBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionsBlockComponent],
    });
    fixture = TestBed.createComponent(ConnectionsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
