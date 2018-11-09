import { TestBed, inject } from '@angular/core/testing';

import { ResultProcessorService } from './result-processor.service';

describe('ResultProcessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultProcessorService]
    });
  });

  it('should be created', inject([ResultProcessorService], (service: ResultProcessorService) => {
    expect(service).toBeTruthy();
  }));
});
