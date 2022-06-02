import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDigitalInputComponent } from './card-digital-input.component';

describe('CardDigitalInputComponent', () => {
  let component: CardDigitalInputComponent;
  let fixture: ComponentFixture<CardDigitalInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDigitalInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDigitalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
