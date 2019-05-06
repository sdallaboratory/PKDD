import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoNetworkModalComponent } from './no-network-modal.component';

describe('NoNetworkModalComponent', () => {
  let component: NoNetworkModalComponent;
  let fixture: ComponentFixture<NoNetworkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoNetworkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoNetworkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
