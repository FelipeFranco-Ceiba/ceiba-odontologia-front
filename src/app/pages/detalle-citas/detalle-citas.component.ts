import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetalleCitaService } from '../services/detalle-cita.service';
import { DetalleCitasFormularioComponent } from './detalle-citas-formulario/detalle-citas-formulario.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subscription } from 'rxjs';
import { InformacionCompletaDetalleCita } from 'src/app/shared/models/detalle-cita.model';

@Component({
  selector: 'app-detalle-citas',
  templateUrl: './detalle-citas.component.html',
  styleUrls: ['./detalle-citas.component.css']
})
export class DetalleCitasComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  displayedColumns: string[] = ['nombresOdontologo', 'apellidosOdontologo', 'nombresCliente', 'apellidosCliente', 'horaCita', 'fechaCita', 'valorCita', 'accion'];
  listaDetalleCitas: InformacionCompletaDetalleCita[];

  constructor(private readonly detalleCitaService: DetalleCitaService,
              private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarInformacionDetalleCita();
    this.actualizarEstado();
  }

  cargarInformacionDetalleCita(): void {
    this.subscription = this.detalleCitaService.consultarDetalleCita().subscribe(detalleCitas => {
      console.log(detalleCitas);
      this.listaDetalleCitas = detalleCitas;
    });
  }

  actualizarEstado(): void {
    this.detalleCitaService.notificarEstadoDetalleCita.subscribe(() => this.cargarInformacionDetalleCita());
  }

  editarOCrear(element?: InformacionCompletaDetalleCita): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = element;

    this.dialog.open(DetalleCitasFormularioComponent, dialogConfig);
  }

  eliminar(element: InformacionCompletaDetalleCita): void {
    if (element && element.idDetalleCita) {
      this.subscription = this.detalleCitaService.eliminarDetalleCita(element.idDetalleCita)
        .subscribe(() => {
          Swal.fire('Exito', 'Se elimino correctamente!', 'success');
          this.detalleCitaService.notificarEstadoDetalleCita.emit();
        });
    } else {
      Swal.fire('Error', 'No se pudo eliminar el detalle de la cita', 'error');
    }
  }

  ngOnDestroy(): void {
    console.log('DESTRUIR');
    this.subscription.unsubscribe();
  }
}
