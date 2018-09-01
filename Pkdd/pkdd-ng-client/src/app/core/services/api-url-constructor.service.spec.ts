import { TestBed, inject } from '@angular/core/testing';

import { ApiUrlConstructorService } from './api-url-constructor.service';

describe('ApiUrlConstructorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUrlConstructorService]
    });
  });

  it('should be created', inject([ApiUrlConstructorService], (service: ApiUrlConstructorService) => {
    expect(service).toBeTruthy();
  }));
});
