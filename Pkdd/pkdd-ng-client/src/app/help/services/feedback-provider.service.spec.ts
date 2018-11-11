import { TestBed, inject } from '@angular/core/testing';

import { FeedbackProviderService } from './feedback-provider.service';

describe('FeedbackProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackProviderService]
    });
  });

  it('should be created', inject([FeedbackProviderService], (service: FeedbackProviderService) => {
    expect(service).toBeTruthy();
  }));
});
