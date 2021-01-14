import { TestBed } from '@angular/core/testing';

import { FipeCarsService } from './fipe-cars.service';

describe('FipeCarsService', () => {
  let service: FipeCarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FipeCarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
