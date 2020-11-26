import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Odontologo } from 'src/app/models/odontologo.model';
import { DetalleCitasFormularioComponent } from '../detalle-citas/detalle-citas-formulario/detalle-citas-formulario.component';
import { OdontologiaService } from '../services/odontologia.service';
import { OdontologoFormularioComponent } from './odontologo-formulario/odontologo-formulario.component';

@Component({
  selector: 'app-odontologo',
  templateUrl: './odontologo.component.html',
  styleUrls: ['./odontologo.component.css']
})
export class OdontologoComponent implements OnInit {

  displayedColumns: string[] = ['nombres', 'apellidos', 'fechaIngreso', 'estado', 'accion'];
  listaOdontologos: Odontologo[];

  constructor(private readonly odontologiaService: OdontologiaService,
              private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarInformacionOdontologo();
    this.actualizarEstado();

  }

  cargarInformacionOdontologo(): void {
    this.odontologiaService.consultarOdontologos().subscribe(odontologos => {
      console.log(odontologos);
      this.listaOdontologos = odontologos;
    });
  }

  actualizarEstado(): void {
    this.odontologiaService.notificarEstadoOdontologoActualizado.subscribe(() => this.cargarInformacionOdontologo());
  }

  editarOCrear(element?: Odontologo): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = element;

    this.dialog.open(OdontologoFormularioComponent, dialogConfig);
  }

  eliminar(element: Odontologo): void {
    this.odontologiaService.eliminarOdontologo(element.idOdontologo).subscribe(() => {
      this.odontologiaService.notificarEstadoOdontologoActualizado.emit();
    });
  }
}
