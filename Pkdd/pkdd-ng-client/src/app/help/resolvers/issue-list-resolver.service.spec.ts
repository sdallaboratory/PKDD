import { TestBed, inject } from '@angular/core/testing';

import { IssueListResolverService } from './issue-list-resolver.service';

describe('IssueListResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssueListResolverService]
    });
  });

  it('should be created', inject([IssueListResolverService], (service: IssueListResolverService) => {
    expect(service).toBeTruthy();
  }));
});
