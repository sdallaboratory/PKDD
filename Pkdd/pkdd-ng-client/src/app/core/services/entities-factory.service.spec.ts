import { TestBed, inject } from '@angular/core/testing';

import { EntitiesFactoryService } from './entities-factory.service';

describe('EntitiesFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntitiesFactoryService]
    });
  });

  it('should be created', inject([EntitiesFactoryService], (service: EntitiesFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
