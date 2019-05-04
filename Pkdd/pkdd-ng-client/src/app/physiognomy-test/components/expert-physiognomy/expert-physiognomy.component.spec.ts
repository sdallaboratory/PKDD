import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertPhysiognomyComponent } from './expert-physiognomy.component';

describe('ExpertPhysiognomyComponent', () => {
  let component: ExpertPhysiognomyComponent;
  let fixture: ComponentFixture<ExpertPhysiognomyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertPhysiognomyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertPhysiognomyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
