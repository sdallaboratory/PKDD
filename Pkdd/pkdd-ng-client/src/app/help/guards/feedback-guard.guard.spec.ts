import { TestBed, async, inject } from '@angular/core/testing';

import { FeedbackGuard } from './feedback.guard';

describe('FeedbackGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackGuard]
    });
  });

  it('should ...', inject([FeedbackGuard], (guard: FeedbackGuard) => {
    expect(guard).toBeTruthy();
  }));
});
