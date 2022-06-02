import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeSparklineComponent } from './gauge-sparkline.component';

describe('GaugeSparklineComponent', () => {
  let component: GaugeSparklineComponent;
  let fixture: ComponentFixture<GaugeSparklineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaugeSparklineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeSparklineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
