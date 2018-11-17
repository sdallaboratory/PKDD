import { TestBed, inject } from '@angular/core/testing';

import { NotificatorService } from './notificator.service';

describe('NotificatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificatorService]
    });
  });

  it('should be created', inject([NotificatorService], (service: NotificatorService) => {
    expect(service).toBeTruthy();
  }));
});
