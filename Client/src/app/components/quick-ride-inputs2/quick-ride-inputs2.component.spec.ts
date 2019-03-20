import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRideInputs2Component } from './quick-ride-inputs2.component';

describe('QuickRideInputs2Component', () => {
  let component: QuickRideInputs2Component;
  let fixture: ComponentFixture<QuickRideInputs2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickRideInputs2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickRideInputs2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
