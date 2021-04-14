/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlertUtilityServiceService } from './AlertUtilityService.service';

describe('Service: AlertUtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertUtilityServiceService]
    });
  });

  it('should ...', inject([AlertUtilityServiceService], (service: AlertUtilityServiceService) => {
    expect(service).toBeTruthy();
  }));
});
