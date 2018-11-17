import { TestBed, inject } from '@angular/core/testing';

import { RoutingTrackerService } from './routing-tracker.service';

describe('RoutingTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutingTrackerService]
    });
  });

  it('should be created', inject([RoutingTrackerService], (service: RoutingTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
