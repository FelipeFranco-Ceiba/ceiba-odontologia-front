import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-cliente-formulario',
  templateUrl: './cliente-formulario.component.html',
  styleUrls: ['./cliente-formulario.component.css']
})
export class ClienteFormularioComponent implements OnInit {

  cliente: Cliente;
  titulo: string;

  public clienteFormulario: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private dialogRef: MatDialogRef<ClienteFormularioComponent>,
    private readonly clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) data: Cliente) {
    this.cliente = data;
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarFormulario();
  }

  crearFormulario() {
    this.clienteFormulario = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required]
    });
  };

  cargarFormulario() {
    if (this.cliente) {
      this.titulo = 'Editar';
      this.clienteFormulario.patchValue(this.cliente);
    } else {
      this.titulo = 'Crear';
    }
  };

  actualizarOGuardar(clienteForm: Cliente, cliente?: Cliente) {
    if (clienteForm && cliente && cliente.idCliente) {
      this.actualizar(clienteForm, cliente);
    } else {
      this.crear(clienteForm);
    }
  }

  actualizar(clienteForm: Cliente, cliente: Cliente) {
    if (!cliente.detalleCitas || cliente.detalleCitas.length === 0) {
      clienteForm.idCliente = cliente.idCliente;
      this.clienteService.actualizarCliente(clienteForm).subscribe(() => {
        Swal.fire('Exito', 'Se actualizo la informacion con exito', 'success');
        this.clienteService.notificarEstadoCliente.emit();
      }
      );
    } else {
      Swal.fire('Error', 'No se puede actualizar la informacion ya que cuenta con citas registradas', 'error');
    }
  };

  crear(cliente: Cliente) {
    this.clienteService.guardarCliente(cliente).subscribe(() => {
      Swal.fire('Exito', 'Se actualizo la informacion con exito', 'success');
      this.clienteService.notificarEstadoCliente.emit();
    }, (error) => {
      Swal.fire('Error', `Se genro un error guardando la información de ${cliente.nombres}`, 'error');
    });
  }

  save() {
    const clienteForm: Cliente = this.clienteFormulario.getRawValue();
    this.actualizarOGuardar(clienteForm, this.cliente);

    this.dialogRef.close(clienteForm);
  };

  close() {
    this.dialogRef.close();
  };

  public hasError(controlName: string, errorName: string) {
    return this.clienteFormulario.controls[controlName].hasError(errorName);
  };

}
