import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMmpiComponent } from './person-mmpi.component';

describe('PersonMmpiComponent', () => {
  let component: PersonMmpiComponent;
  let fixture: ComponentFixture<PersonMmpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonMmpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMmpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
