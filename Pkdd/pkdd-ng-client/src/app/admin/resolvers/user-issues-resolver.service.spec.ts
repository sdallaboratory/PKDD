import { TestBed, inject } from '@angular/core/testing';

import { UserIssuesResolverService } from './user-issues-resolver.service';

describe('UserIssuesResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserIssuesResolverService]
    });
  });

  it('should be created', inject([UserIssuesResolverService], (service: UserIssuesResolverService) => {
    expect(service).toBeTruthy();
  }));
});
