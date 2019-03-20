import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinRideComponent } from './join-ride.component';

describe('JoinRideComponent', () => {
  let component: JoinRideComponent;
  let fixture: ComponentFixture<JoinRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
