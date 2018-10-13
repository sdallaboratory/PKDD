import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTextBlockComponent } from './date-text-block.component';

describe('DateTextBlockComponent', () => {
  let component: DateTextBlockComponent;
  let fixture: ComponentFixture<DateTextBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTextBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTextBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
