import { TestBed, inject } from '@angular/core/testing';

import { MenuNoItems } from './menu-no-items';

describe('MenuNoItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuNoItems]
    });
  });

  it('should be created', inject([MenuNoItems], (service: MenuNoItems) => {
    expect(service).toBeTruthy();
  }));
});
