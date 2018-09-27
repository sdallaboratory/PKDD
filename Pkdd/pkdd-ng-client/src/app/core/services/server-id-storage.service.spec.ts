import { TestBed, inject } from '@angular/core/testing';

import { ServerIdStorageService } from './server-id-storage.service';

describe('ServerIdStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerIdStorageService]
    });
  });

  it('should be created', inject([ServerIdStorageService], (service: ServerIdStorageService) => {
    expect(service).toBeTruthy();
  }));
});
