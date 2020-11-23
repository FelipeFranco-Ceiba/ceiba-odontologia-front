import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from '../services/cliente.service';
import { ClienteFormularioComponent } from './cliente-formulario/cliente-formulario.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public listaClientes: Cliente[];

  constructor(private readonly clienteService: ClienteService,
              private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarInformacionCliente();
    this.actualizarEstado();
  }

  cargarInformacionCliente() {
    this.clienteService.consultarClientes().subscribe(clientes => {
      console.log(clientes);
      this.listaClientes = clientes;
    });
  }

  actualizarEstado() {
    this.clienteService.notificarEstadoCliente.subscribe(() => this.cargarInformacionCliente());
  }

  editarOCrear(element?: Cliente) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = element;

    this.dialog.open(ClienteFormularioComponent, dialogConfig);
  }

  eliminar(element: Cliente) {
    this.clienteService.eliminarCliente(element.idCliente).subscribe(() => {
      this.clienteService.notificarEstadoCliente.emit();
    });
  }

  displayedColumns: string[] = ['nombres', 'apellidos', 'accion'];
}
