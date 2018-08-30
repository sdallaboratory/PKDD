import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PkddPageComponent } from './pkdd-page.component';

describe('PkddPageComponent', () => {
  let component: PkddPageComponent;
  let fixture: ComponentFixture<PkddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PkddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PkddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
