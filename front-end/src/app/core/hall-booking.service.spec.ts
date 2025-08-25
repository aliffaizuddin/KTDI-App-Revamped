import { TestBed } from '@angular/core/testing';

import { HallBookingService } from './hall-booking.service';

describe('HallBookingService', () => {
  let service: HallBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HallBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
