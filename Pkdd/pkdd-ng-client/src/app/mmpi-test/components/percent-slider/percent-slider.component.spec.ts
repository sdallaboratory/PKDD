import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentSliderComponent } from './percent-slider.component';

describe('PercentSliderComponent', () => {
  let component: PercentSliderComponent;
  let fixture: ComponentFixture<PercentSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
