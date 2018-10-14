import { TestBed, inject } from '@angular/core/testing';

import { AdminMenuResolverService } from './admin-menu-resolver.service';

describe('AdminMenuResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminMenuResolverService]
    });
  });

  it('should be created', inject([AdminMenuResolverService], (service: AdminMenuResolverService) => {
    expect(service).toBeTruthy();
  }));
});
