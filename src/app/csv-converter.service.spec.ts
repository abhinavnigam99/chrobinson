import { TestBed } from '@angular/core/testing';

import { CsvConverterService } from './csv-converter.service';

describe('CsvConverterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CsvConverterService = TestBed.get(CsvConverterService);
    expect(service).toBeTruthy();
  });
});
