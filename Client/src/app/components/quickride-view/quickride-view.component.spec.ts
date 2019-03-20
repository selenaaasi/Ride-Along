import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickrideViewComponent } from './quickride-view.component';

describe('QuickrideViewComponent', () => {
  let component: QuickrideViewComponent;
  let fixture: ComponentFixture<QuickrideViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickrideViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickrideViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
