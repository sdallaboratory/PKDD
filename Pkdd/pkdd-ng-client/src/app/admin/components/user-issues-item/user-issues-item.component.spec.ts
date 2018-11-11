import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIssuesItemComponent } from './user-issues-item.component';

describe('UserIssuesItemComponent', () => {
  let component: UserIssuesItemComponent;
  let fixture: ComponentFixture<UserIssuesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIssuesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIssuesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
