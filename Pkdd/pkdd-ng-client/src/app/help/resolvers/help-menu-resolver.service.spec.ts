import { TestBed, inject } from '@angular/core/testing';

import { HelpMenuResolverService } from './help-menu-resolver.service';

describe('HelpMenuResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelpMenuResolverService]
    });
  });

  it('should be created', inject([HelpMenuResolverService], (service: HelpMenuResolverService) => {
    expect(service).toBeTruthy();
  }));
});
