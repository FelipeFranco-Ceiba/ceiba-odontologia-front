import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/shared/models/cliente.model';

import { ClienteFormularioComponent } from './cliente-formulario.component';

describe('ClienteFormularioComponent', () => {
  let component: ClienteFormularioComponent;
  let fixture: ComponentFixture<ClienteFormularioComponent>;
  let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteFormularioComponent ],
      providers: [ClienteService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { myData: ClienteFormularioComponent } }],
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteFormularioComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario es invalido cuando hay al menos un campo sin diligenciar', () => {
    component.clienteFormulario.controls.nombres.setValue('Felipe');
    component.clienteFormulario.controls.apellidos.setValue('');

    expect(component.clienteFormulario.valid).toBeFalsy();
  });

  it('Se diligencia todos los campos del formulario de cliente', () => {
    component.clienteFormulario.controls.nombres.setValue('Felipe');
    component.clienteFormulario.controls.apellidos.setValue('Franco');

    expect(component.clienteFormulario.valid).toBeTruthy();
  });

  it('Cuando se ejecuta el metodo cargarFormulario() y no existe informacion del cliente, debe mostrar el titulo CREAR', () => {
    component.cliente = null;

    component.cargarFormulario();
    expect(component.titulo).toEqual('Crear');
  });

  it('Cuando se ejecuta el metodo cargarFormulario() y existe informacion del cliente, debe mostrar el titulo EDITAR', () => {
    const cliente: Cliente = {nombres: 'Juan', apellidos: 'Bedoya'};
    component.cliente = cliente;

    component.cargarFormulario();
    expect(component.titulo).toEqual('Editar');
    expect(component.clienteFormulario.getRawValue()).toEqual(cliente);
  });

});
