import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolViewComponent } from './carpool-view.component';

describe('CarpoolViewComponent', () => {
  let component: CarpoolViewComponent;
  let fixture: ComponentFixture<CarpoolViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpoolViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpoolViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
