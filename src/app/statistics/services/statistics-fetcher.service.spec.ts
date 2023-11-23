import { TestBed } from '@angular/core/testing';

import { StatisticsFetcherService } from './statistics-fetcher.service';

describe('StatisticsFetcherService', () => {
  let service: StatisticsFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
