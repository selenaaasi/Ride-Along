import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolRideListComponent } from './carpool-ride-list.component';

describe('CarpoolRideListComponent', () => {
  let component: CarpoolRideListComponent;
  let fixture: ComponentFixture<CarpoolRideListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpoolRideListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpoolRideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
