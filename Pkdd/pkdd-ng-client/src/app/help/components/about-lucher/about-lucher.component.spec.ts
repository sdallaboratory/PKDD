import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutLucherComponent } from './about-lucher.component';

describe('AboutLucherComponent', () => {
  let component: AboutLucherComponent;
  let fixture: ComponentFixture<AboutLucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutLucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutLucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
