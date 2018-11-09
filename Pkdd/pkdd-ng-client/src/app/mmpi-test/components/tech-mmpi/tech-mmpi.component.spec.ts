import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechMmpiComponent } from './tech-mmpi.component';

describe('TechMmpiComponent', () => {
  let component: TechMmpiComponent;
  let fixture: ComponentFixture<TechMmpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechMmpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechMmpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
