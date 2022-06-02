import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneLineChartComponent } from './one-line-chart.component';

describe('OneLineChartComponent', () => {
  let component: OneLineChartComponent;
  let fixture: ComponentFixture<OneLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
