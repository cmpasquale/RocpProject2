import { TestBed } from '@angular/core/testing';

import { RocpService } from './rocp.service';

describe('RocpService', () => {
  let service: RocpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RocpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
