import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallBookingComponent } from './hall-booking.component';

describe('HallBookingComponent', () => {
  let component: HallBookingComponent;
  let fixture: ComponentFixture<HallBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HallBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
