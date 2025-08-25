import { TestBed } from '@angular/core/testing';

import { RoomRegistrationService } from './room-registration.service';

describe('RoomRegistrationService', () => {
  let service: RoomRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
