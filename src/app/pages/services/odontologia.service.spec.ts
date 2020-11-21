import { TestBed } from '@angular/core/testing';

import { ServicioOdontologiaService } from './odontologia.service';

describe('ServicioOdontologiaService', () => {
  let service: ServicioOdontologiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioOdontologiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
