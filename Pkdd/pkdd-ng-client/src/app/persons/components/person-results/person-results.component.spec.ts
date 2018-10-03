import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonResultsComponent } from './person-results.component';

describe('PersonResultsComponent', () => {
  let component: PersonResultsComponent;
  let fixture: ComponentFixture<PersonResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
