import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverPulseComponent } from './hover-pulse.component';

describe('HoverPulseComponent', () => {
  let component: HoverPulseComponent;
  let fixture: ComponentFixture<HoverPulseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoverPulseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoverPulseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
