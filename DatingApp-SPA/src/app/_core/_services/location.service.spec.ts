/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { locationService } from './location.service';

describe('Service: Location', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [locationService]
    });
  });

  it('should ...', inject([locationService], (service: locationService) => {
    expect(service).toBeTruthy();
  }));
});
