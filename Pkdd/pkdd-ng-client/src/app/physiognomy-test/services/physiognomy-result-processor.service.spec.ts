import { TestBed, inject } from '@angular/core/testing';

import { PhysiognomyResultProcessorService } from './physiognomy-result-processor.service';

describe('PhysiognomyResultProcessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhysiognomyResultProcessorService]
    });
  });

  it('should be created', inject([PhysiognomyResultProcessorService], (service: PhysiognomyResultProcessorService) => {
    expect(service).toBeTruthy();
  }));
});
