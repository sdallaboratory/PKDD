import { TestBed, inject } from '@angular/core/testing';

import { ResultsProviderService } from './results-provider.service';

describe('ResultsProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultsProviderService]
    });
  });

  it('should be created', inject([ResultsProviderService], (service: ResultsProviderService) => {
    expect(service).toBeTruthy();
  }));
});
