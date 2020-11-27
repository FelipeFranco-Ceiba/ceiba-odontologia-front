import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Odontologo } from 'src/app/models/odontologo.model';
import { OdontologiaService } from '../services/odontologia.service';
import { OdontologoFormularioComponent } from './odontologo-formulario/odontologo-formulario.component';

@Component({
  selector: 'app-odontologo',
  templateUrl: './odontologo.component.html',
  styleUrls: ['./odontologo.component.css']
})
export class OdontologoComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  displayedColumns: string[] = ['nombres', 'apellidos', 'fechaIngreso', 'estado', 'accion'];
  listaOdontologos: Odontologo[];

  constructor(private readonly odontologiaService: OdontologiaService,
              private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarInformacionOdontologo();
    this.actualizarEstado();

  }

  cargarInformacionOdontologo(): void {
    this.subscription = this.odontologiaService.consultarOdontologos().subscribe(odontologos => {
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
    this.subscription = this.odontologiaService.eliminarOdontologo(element.idOdontologo).subscribe(() => {
      this.odontologiaService.notificarEstadoOdontologoActualizado.emit();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
