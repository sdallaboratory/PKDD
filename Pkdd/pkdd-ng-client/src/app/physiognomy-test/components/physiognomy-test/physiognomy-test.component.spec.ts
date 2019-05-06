import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiognomyTestComponent } from './physiognomy-test.component';

describe('PhysiognomyTestComponent', () => {
  let component: PhysiognomyTestComponent;
  let fixture: ComponentFixture<PhysiognomyTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhysiognomyTestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiognomyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
