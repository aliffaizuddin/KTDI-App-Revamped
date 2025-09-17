import { TestBed } from '@angular/core/testing';

import { ReportDamageService } from './report-damage.service';

describe('ReportDamageService', () => {
  let service: ReportDamageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportDamageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
