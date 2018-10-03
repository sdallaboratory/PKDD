import { TestBed, inject } from '@angular/core/testing';

import { RouteDataProviderService } from './route-data-provider.service';

describe('RouteDataProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteDataProviderService]
    });
  });

  it('should be created', inject([RouteDataProviderService], (service: RouteDataProviderService) => {
    expect(service).toBeTruthy();
  }));
});
