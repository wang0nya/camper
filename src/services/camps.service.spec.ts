import { TestBed, inject } from '@angular/core/testing';

import { CampsService } from './camps.service';

describe('CampsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampsService]
    });
  });

  it('should be created', inject([CampsService], (service: CampsService) => {
    expect(service).toBeTruthy();
  }));
});
