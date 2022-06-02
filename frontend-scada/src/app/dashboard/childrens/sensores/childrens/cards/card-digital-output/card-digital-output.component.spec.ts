import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDigitalOutputComponent } from './card-digital-output.component';

describe('CardDigitalOutputComponent', () => {
  let component: CardDigitalOutputComponent;
  let fixture: ComponentFixture<CardDigitalOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDigitalOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDigitalOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
