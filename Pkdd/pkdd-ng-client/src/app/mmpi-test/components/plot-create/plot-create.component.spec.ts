import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotCreateComponent } from './plot-create.component';

describe('PlotCreateComponent', () => {
  let component: PlotCreateComponent;
  let fixture: ComponentFixture<PlotCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
