import { TestBed } from '@angular/core/testing';

import { OdontologiaService } from './odontologia.service';

describe('OdontologiaService', () => {
  let service: OdontologiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdontologiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
