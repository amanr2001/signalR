import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatpaggeComponent } from './chatpagge.component';

describe('ChatpaggeComponent', () => {
  let component: ChatpaggeComponent;
  let fixture: ComponentFixture<ChatpaggeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatpaggeComponent]
    });
    fixture = TestBed.createComponent(ChatpaggeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
