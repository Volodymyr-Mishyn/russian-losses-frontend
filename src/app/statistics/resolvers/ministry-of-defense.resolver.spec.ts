import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { ministryOfDefenseResolver } from './ministry-of-defense.resolver';

describe('ministryOfDefenseResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => ministryOfDefenseResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
