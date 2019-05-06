import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuscherTestComponent } from './luscher-test.component';

describe('LuscherTestComponent', () => {
  let component: LuscherTestComponent;
  let fixture: ComponentFixture<LuscherTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuscherTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuscherTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
