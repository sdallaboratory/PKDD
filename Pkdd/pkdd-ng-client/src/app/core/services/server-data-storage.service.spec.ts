import { TestBed, inject } from '@angular/core/testing';

import { ServerDataStorageService } from './server-data-storage.service';

describe('ServerDataStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerDataStorageService]
    });
  });

  it('should be created', inject([ServerDataStorageService], (service: ServerDataStorageService) => {
    expect(service).toBeTruthy();
  }));
});
