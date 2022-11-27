import { TestBed } from '@angular/core/testing';

import { ApphttpService } from './apphttp.service';

describe('ApphttpService', () => {
  let service: ApphttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApphttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
