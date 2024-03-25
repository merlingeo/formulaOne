import { TestBed } from '@angular/core/testing';

import { FormulaOneService } from './formula-one.service';

describe('FormulaOneService', () => {
  let service: FormulaOneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulaOneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
