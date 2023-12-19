import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDedicatedComponent } from './group-dedicated.component';

describe('GroupDedicatedComponent', () => {
  let component: GroupDedicatedComponent;
  let fixture: ComponentFixture<GroupDedicatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupDedicatedComponent],
    });
    fixture = TestBed.createComponent(GroupDedicatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
