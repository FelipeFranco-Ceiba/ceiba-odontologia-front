import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageService } from 'ngx-webstorage';
import { of } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { InformacionCompletaDetalleCita } from 'src/app/models/detalle-cita.model';
import { Odontologo } from 'src/app/models/odontologo.model';
import { Usuario } from 'src/app/models/usuario.model';
import { DetalleCitaService } from '../../services/detalle-cita.service';

import { DetalleCitasFormularioComponent } from './detalle-citas-formulario.component';

describe('DetalleCitasFormularioComponent', () => {
  let component: DetalleCitasFormularioComponent;
  let fixture: ComponentFixture<DetalleCitasFormularioComponent>;
  let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCitasFormularioComponent ],
      providers: [
        DetalleCitaService,
        LocalStorageService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { myData: DetalleCitasFormularioComponent } }
      ],
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        MatNativeDateModule,
        MatDatepickerModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCitasFormularioComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario es invalido cuando hay al menos un campo sin diligenciar', () => {
    component.detalleCitaFomulario.controls.nombresOdontologo.setValue('Felipe');
    component.detalleCitaFomulario.controls.nombresCliente.setValue('Juan');
    component.detalleCitaFomulario.controls.horaCita.setValue(2);
    component.detalleCitaFomulario.controls.fechaCita.setValue(undefined);

    expect(component.detalleCitaFomulario.valid).toBeFalsy();
  });

  it('El formulario es valido cuando se diligencia todos los campos', () => {
    component.detalleCitaFomulario.controls.nombresOdontologo.setValue('Felipe');
    component.detalleCitaFomulario.controls.nombresCliente.setValue('Juan');
    component.detalleCitaFomulario.controls.horaCita.setValue(2);
    component.detalleCitaFomulario.controls.fechaCita.setValue(new Date('2020-11-24T00:00:00.000-05:00'));
    component.detalleCitaFomulario.controls.valorCita.setValue(35000);

    expect(component.detalleCitaFomulario.valid).toBeTruthy();
  });

  it('Cuando se ejecuta el metodo cargarFormulario() y no existe informacion del detalle de la cita, debe mostrar el titulo CREAR', () => {
    component.detalleCita = null;

    component.cargarFormulario();
    expect(component.titulo).toEqual('Crear');
  });

  it('Cuando se ejecuta el metodo cargarFormulario() y existe informacion del detalle de la cita, debe mostrar el titulo EDITAR', () => {
    const cliente: Cliente = {nombres: 'Juan', apellidos: 'Bedoya'};
    const odontologo: Odontologo =
      {nombres: 'Juan', apellidos: 'Bedoya', fechaIngreso: new Date('2020-11-24T00:00:00.000-05:00'), estado: true };
    const login: Usuario = {usuario: 'pipe', clave: 'franco'};
    const detalleCita: InformacionCompletaDetalleCita =
      {fechaCita: new Date('2020-11-24T00:00:00.000-05:00'), horaCita: 3, valorCita: 35000, cliente, odontologo, login};
    component.detalleCita = detalleCita;

    component.cargarFormulario();
    expect(component.titulo).toEqual('Editar');
  });
});
