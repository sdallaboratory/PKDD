import { TestBed, inject } from '@angular/core/testing';

import { LocalDataStorageService } from './local-data-storage.service';

describe('LocalDataStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalDataStorageService]
    });
  });

  it('should be created', inject([LocalDataStorageService], (service: LocalDataStorageService) => {
    expect(service).toBeTruthy();
  }));
});
