import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSparklineComponent } from './card-sparkline.component';

describe('CardSparklineComponent', () => {
  let component: CardSparklineComponent;
  let fixture: ComponentFixture<CardSparklineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSparklineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSparklineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
