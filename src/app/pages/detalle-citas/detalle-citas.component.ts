import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InformacionCompletaDetalleCita } from 'src/app/models/detalle-cita.model';
import { DetalleCitaService } from '../services/detalle-cita.service';
import { DetalleCitasFormularioComponent } from './detalle-citas-formulario/detalle-citas-formulario.component';

@Component({
  selector: 'app-detalle-citas',
  templateUrl: './detalle-citas.component.html',
  styleUrls: ['./detalle-citas.component.css']
})
export class DetalleCitasComponent implements OnInit {

  listaDetalleCitas: InformacionCompletaDetalleCita[];

  constructor(private readonly detalleCitaService: DetalleCitaService,
              private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarInformacionDetalleCita();
    this.actualizarEstado();
  }

  cargarInformacionDetalleCita() {
    this.detalleCitaService.consultarDetalleCita().subscribe(detalleCitas => {
      console.log(detalleCitas);
      this.listaDetalleCitas = detalleCitas;
    });
  }

  actualizarEstado() {
    this.detalleCitaService.notificarEstadoDetalleCita.subscribe(() => this.cargarInformacionDetalleCita());
  }

  editarOCrear(element?: InformacionCompletaDetalleCita) {
    console.log('MIRAAAA!', element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = element;

    this.dialog.open(DetalleCitasFormularioComponent, dialogConfig);
  }

  eliminar(element: InformacionCompletaDetalleCita) {
    
  }

  displayedColumns: string[] = ['nombresOdontologo', 'apellidosOdontologo', 'nombresCliente', 'apellidosCliente', 'horaCita', 'fechaCita', 'valorCita', 'accion'];
}
