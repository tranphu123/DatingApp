/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderPartService } from './orderPart.service';

describe('Service: OrderPartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderPartService]
    });
  });

  it('should ...', inject([OrderPartService], (service: OrderPartService) => {
    expect(service).toBeTruthy();
  }));
});
