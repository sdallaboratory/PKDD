import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMmpiComponent } from './about-mmpi.component';

describe('AboutMmpiComponent', () => {
  let component: AboutMmpiComponent;
  let fixture: ComponentFixture<AboutMmpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMmpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMmpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
