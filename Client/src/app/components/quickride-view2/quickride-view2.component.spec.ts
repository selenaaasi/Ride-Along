import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickrideView2Component } from './quickride-view2.component';

describe('QuickrideView2Component', () => {
  let component: QuickrideView2Component;
  let fixture: ComponentFixture<QuickrideView2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickrideView2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickrideView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
