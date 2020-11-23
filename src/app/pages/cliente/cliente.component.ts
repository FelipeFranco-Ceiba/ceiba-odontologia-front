import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from '../services/cliente.service';
import { ClienteFormularioComponent } from './cliente-formulario/cliente-formulario.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
    console.log(element.detalleCitas.length); 
    if (!element.detalleCitas || element.detalleCitas.length === 0) {
      this.clienteService.eliminarCliente(element.idCliente).subscribe(() => {
        Swal.fire('Exito', 'se elimino correctamete!', 'success'); 
        this.clienteService.notificarEstadoCliente.emit();
      });
    } else {
      Swal.fire('Error', 'No se puede eliminar el cliente ya que tiene citas creadas', 'error');
    }
  }

  displayedColumns: string[] = ['nombres', 'apellidos', 'accion'];
}
