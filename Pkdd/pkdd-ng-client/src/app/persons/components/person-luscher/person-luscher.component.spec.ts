import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonLuscherComponent } from './person-luscher.component';

describe('PersonLuscherComponent', () => {
  let component: PersonLuscherComponent;
  let fixture: ComponentFixture<PersonLuscherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonLuscherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonLuscherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
