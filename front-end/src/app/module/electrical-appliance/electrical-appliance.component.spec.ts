import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricalApplianceComponent } from './electrical-appliance.component';

describe('ElectricalApplianceComponent', () => {
  let component: ElectricalApplianceComponent;
  let fixture: ComponentFixture<ElectricalApplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectricalApplianceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectricalApplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
