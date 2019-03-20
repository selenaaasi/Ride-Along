import { TestBed, inject } from '@angular/core/testing';

import { Neo4jService } from './neo4j.service';

describe('Neo4jService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Neo4jService]
    });
  });

  it('should be created', inject([Neo4jService], (service: Neo4jService) => {
    expect(service).toBeTruthy();
  }));
});
