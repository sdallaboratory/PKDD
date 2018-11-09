import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignerComponent } from './aligner.component';

describe('AlignerComponent', () => {
  let component: AlignerComponent;
  let fixture: ComponentFixture<AlignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
