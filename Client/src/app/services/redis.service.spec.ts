import { TestBed, inject } from '@angular/core/testing';

import { RedisService } from './redis.service';

describe('RedisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedisService]
    });
  });

  it('should be created', inject([RedisService], (service: RedisService) => {
    expect(service).toBeTruthy();
  }));
});
