import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRideMapComponent } from './quick-ride-map.component';

describe('QuickRideMapComponent', () => {
  let component: QuickRideMapComponent;
  let fixture: ComponentFixture<QuickRideMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickRideMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickRideMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
