import { TestBed, inject } from '@angular/core/testing';

import { TechMmpiService } from './tech-mmpi.service';

describe('TechMmpiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TechMmpiService]
    });
  });

  it('should be created', inject([TechMmpiService], (service: TechMmpiService) => {
    expect(service).toBeTruthy();
  }));
});
