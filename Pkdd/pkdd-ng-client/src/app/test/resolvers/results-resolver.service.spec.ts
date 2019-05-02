import { TestBed, inject } from '@angular/core/testing';

import { ResultsResolverService } from './results-resolver.service';

describe('ResultsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultsResolverService]
    });
  });

  it('should be created', inject([ResultsResolverService], (service: ResultsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
