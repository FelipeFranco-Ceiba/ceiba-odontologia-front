import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

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
    clienteForm.idCliente = cliente.idCliente;
    this.clienteService.actualizarCliente(clienteForm).subscribe(() =>
      this.clienteService.notificarEstadoCliente.emit()
    );
  };

  crear(cliente: Cliente) {
    this.clienteService.guardarCliente(cliente).subscribe(() =>
      this.clienteService.notificarEstadoCliente.emit()
    );
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
