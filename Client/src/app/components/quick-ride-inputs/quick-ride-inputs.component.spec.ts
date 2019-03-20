import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRideInputsComponent } from './quick-ride-inputs.component';

describe('QuickRideInputsComponent', () => {
  let component: QuickRideInputsComponent;
  let fixture: ComponentFixture<QuickRideInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickRideInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickRideInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
