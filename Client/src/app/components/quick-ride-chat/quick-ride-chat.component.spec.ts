import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRideChatComponent } from './quick-ride-chat.component';

describe('QuickRideChatComponent', () => {
  let component: QuickRideChatComponent;
  let fixture: ComponentFixture<QuickRideChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickRideChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickRideChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
