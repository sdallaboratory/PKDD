import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechPhysiognomyComponent } from './tech-physiognomy.component';

describe('TechPhysiognomyComponent', () => {
  let component: TechPhysiognomyComponent;
  let fixture: ComponentFixture<TechPhysiognomyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechPhysiognomyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechPhysiognomyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
