import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { StatisticBlockComponent } from './statistic-block.component';

describe('StatisticBlockComponent', () => {
  let component: StatisticBlockComponent;
  let fixture: ComponentFixture<StatisticBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticBlockComponent],
      imports: [MatIconModule],
    });
    fixture = TestBed.createComponent(StatisticBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
