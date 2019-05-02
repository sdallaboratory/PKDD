import { TestBed, inject } from '@angular/core/testing';

import { LuscherResultProcessorService } from './luscher-result-processor.service';

describe('LuscherResultProcessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LuscherResultProcessorService]
    });
  });

  it('should be created', inject([LuscherResultProcessorService], (service: LuscherResultProcessorService) => {
    expect(service).toBeTruthy();
  }));
});
