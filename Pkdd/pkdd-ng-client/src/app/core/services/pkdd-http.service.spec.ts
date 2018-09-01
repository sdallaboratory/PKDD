import { TestBed, inject } from '@angular/core/testing';

import { PkddHttpService } from './pkdd-http.service';

describe('PkddHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PkddHttpService]
    });
  });

  it('should be created', inject([PkddHttpService], (service: PkddHttpService) => {
    expect(service).toBeTruthy();
  }));
});
