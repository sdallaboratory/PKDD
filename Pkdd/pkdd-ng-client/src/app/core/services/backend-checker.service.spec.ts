import { TestBed, inject } from '@angular/core/testing';

import { BackendCheckerService } from './backend-checker.service';

describe('BackendCheckerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendCheckerService]
    });
  });

  it('should be created', inject([BackendCheckerService], (service: BackendCheckerService) => {
    expect(service).toBeTruthy();
  }));
});
