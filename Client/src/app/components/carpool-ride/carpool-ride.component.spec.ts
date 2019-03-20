import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolRideComponent } from './carpool-ride.component';

describe('CarpoolRideComponent', () => {
  let component: CarpoolRideComponent;
  let fixture: ComponentFixture<CarpoolRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpoolRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpoolRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
