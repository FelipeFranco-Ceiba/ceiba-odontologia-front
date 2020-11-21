import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontologoFormularioComponent } from './odontologo-formulario.component';

describe('OdontologoFormularioComponent', () => {
  let component: OdontologoFormularioComponent;
  let fixture: ComponentFixture<OdontologoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdontologoFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdontologoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
