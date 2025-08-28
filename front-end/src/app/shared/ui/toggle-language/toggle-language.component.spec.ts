import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleLanguageComponent } from './toggle-language.component';

describe('ToggleLanguageComponent', () => {
  let component: ToggleLanguageComponent;
  let fixture: ComponentFixture<ToggleLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleLanguageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
