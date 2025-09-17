import { TestBed } from '@angular/core/testing';

import { ElectricalApplianceService } from './electrical-appliance.service';

describe('ElectricalApplianceService', () => {
  let service: ElectricalApplianceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectricalApplianceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
