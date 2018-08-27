import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllAdsComponent } from './controll-ads.component';

describe('ControllAdsComponent', () => {
  let component: ControllAdsComponent;
  let fixture: ComponentFixture<ControllAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
