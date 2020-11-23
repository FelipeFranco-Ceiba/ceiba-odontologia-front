import { TestBed } from '@angular/core/testing';

import { DetalleCitaService } from './detalle-cita.service';

describe('DetalleCitaService', () => {
  let service: DetalleCitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleCitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
