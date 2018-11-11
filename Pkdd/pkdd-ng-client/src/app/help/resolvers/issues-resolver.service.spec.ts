import { TestBed, inject } from '@angular/core/testing';

import { IssuesResolverService } from './issues-resolver.service';

describe('IssuesResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssuesResolverService]
    });
  });

  it('should be created', inject([IssuesResolverService], (service: IssuesResolverService) => {
    expect(service).toBeTruthy();
  }));
});
