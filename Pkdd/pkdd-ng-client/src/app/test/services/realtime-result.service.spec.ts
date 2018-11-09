import { TestBed, inject } from '@angular/core/testing';

import { RealtimeResultService } from './realtime-result.service';

describe('RealtimeResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RealtimeResultService]
    });
  });

  it('should be created', inject([RealtimeResultService], (service: RealtimeResultService) => {
    expect(service).toBeTruthy();
  }));
});
