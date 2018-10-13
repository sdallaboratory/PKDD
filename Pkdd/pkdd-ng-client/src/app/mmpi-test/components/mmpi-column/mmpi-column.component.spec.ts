import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmpiColumnComponent } from './mmpi-column.component';

describe('MmpiColumnComponent', () => {
  let component: MmpiColumnComponent;
  let fixture: ComponentFixture<MmpiColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmpiColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmpiColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
