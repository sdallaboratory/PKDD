import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechLuscherComponent } from './tech-luscher.component';

describe('TechLuscherComponent', () => {
  let component: TechLuscherComponent;
  let fixture: ComponentFixture<TechLuscherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechLuscherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechLuscherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
