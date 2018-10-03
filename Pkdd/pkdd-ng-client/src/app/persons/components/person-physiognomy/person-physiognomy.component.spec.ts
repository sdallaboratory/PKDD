import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPhysiognomyComponent } from './person-physiognomy.component';

describe('PersonPhysiognomyComponent', () => {
  let component: PersonPhysiognomyComponent;
  let fixture: ComponentFixture<PersonPhysiognomyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonPhysiognomyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPhysiognomyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
