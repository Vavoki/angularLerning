import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlFilterAdsComponent } from './control-filter-ads.component';

describe('ControlFilterAdsComponent', () => {
  let component: ControlFilterAdsComponent;
  let fixture: ComponentFixture<ControlFilterAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlFilterAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlFilterAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
