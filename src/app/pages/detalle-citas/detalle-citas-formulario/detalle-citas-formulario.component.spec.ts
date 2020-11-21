import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCitasFormularioComponent } from './detalle-citas-formulario.component';

describe('DetalleCitasFormularioComponent', () => {
  let component: DetalleCitasFormularioComponent;
  let fixture: ComponentFixture<DetalleCitasFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCitasFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCitasFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
