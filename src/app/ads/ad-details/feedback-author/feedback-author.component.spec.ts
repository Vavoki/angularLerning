import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackAuthorComponent } from './feedback-author.component';

describe('FeedbackAuthorComponent', () => {
  let component: FeedbackAuthorComponent;
  let fixture: ComponentFixture<FeedbackAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
