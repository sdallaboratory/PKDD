import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertLuscherComponent } from './expert-luscher.component';

describe('ExpertLuscherComponent', () => {
  let component: ExpertLuscherComponent;
  let fixture: ComponentFixture<ExpertLuscherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertLuscherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertLuscherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
