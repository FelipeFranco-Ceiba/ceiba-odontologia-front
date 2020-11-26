import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Cliente } from 'src/app/models/cliente.model';
import { InformacionCompletaDetalleCita } from 'src/app/models/detalle-cita.model';
import { Odontologo } from 'src/app/models/odontologo.model';
import { ClienteService } from '../../services/cliente.service';
import { DetalleCitaService } from '../../services/detalle-cita.service';
import { OdontologiaService } from '../../services/odontologia.service';
import { TransformDetalleCita } from '../../utility/transform/transformarDetalleCitaToBack';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-detalle-citas-formulario',
  templateUrl: './detalle-citas-formulario.component.html',
  styleUrls: ['./detalle-citas-formulario.component.css']
})
export class DetalleCitasFormularioComponent implements OnInit {

  detalleCita: InformacionCompletaDetalleCita;
  titulo: string;
  odontologos: Odontologo[];
  clientes: Cliente[];

  public detalleCitaFomulario: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private dialogRef: MatDialogRef<DetalleCitasFormularioComponent>,
    private readonly detalleCitaService: DetalleCitaService,
    private readonly odontologoService: OdontologiaService,
    private readonly clienteService: ClienteService,
    private readonly authService: AuthService,
    @Inject(MAT_DIALOG_DATA) data: InformacionCompletaDetalleCita) {
    this.detalleCita = data;
    console.log('SI LLEGO INFO', this.detalleCita);
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarFormulario();
    this.cargarOdontologos();
    this.cargarCliente();
  }

  crearFormulario(): void {
    this.detalleCitaFomulario = this.fb.group({
      nombresOdontologo: ['', Validators.required],
      nombresCliente: ['', Validators.required],
      horaCita: ['', Validators.required],
      valorCita: ['35000', [Validators.required]],
      fechaCita: ['', Validators.required],
    });
  }

  cargarFormulario(): void {
    console.log('SII ENTRO', this.detalleCita);
    if (this.detalleCita) {
      this.titulo = 'Editar';
      this.detalleCitaFomulario.get('nombresOdontologo').setValue(this.detalleCita.odontologo);
      this.detalleCitaFomulario.get('nombresCliente').setValue(this.detalleCita.cliente);
      this.detalleCitaFomulario.patchValue(this.detalleCita);
    } else {
      this.titulo = 'Crear';
    }
  }

  cargarOdontologos(): void {
    this.odontologoService.consultarOdontologos()
      .subscribe(listaOdontologo => this.odontologos = listaOdontologo);
  }

  cargarCliente(): void {
    this.clienteService.consultarClientes().subscribe(listaCliente => this.clientes = listaCliente);
  }

  odontologoSeleccionado(o2: Odontologo, o1: Odontologo): boolean {
    return o1.idOdontologo === o2.idOdontologo ? true : false;
  }

  clienteSeleccionado(o2: Cliente, o1: Cliente): boolean {
    return o1.idCliente === o2.idCliente ? true : false;
  }

  actualizarOGuardar(detalleCitaForm: InformacionCompletaDetalleCita, detalleCita?: InformacionCompletaDetalleCita): void {
    if (detalleCitaForm && detalleCita && detalleCita.idDetalleCita) {
      this.actualizar(detalleCitaForm, detalleCita);
    } else {
      this.crear(detalleCitaForm);
    }
  }

  transformarDate(fechaIngreso: any): any {
    return new Date(fechaIngreso).toLocaleString('es-ES');
  }

  actualizar(detalleCitaForm: InformacionCompletaDetalleCita, detalleCita: InformacionCompletaDetalleCita): void {
    detalleCitaForm.idDetalleCita = detalleCita.idDetalleCita;
    detalleCitaForm.login = detalleCita.login;
    this.detalleCitaService.actualizarDetalleCita(
      TransformDetalleCita.transformDetalleCItaToDetalleCitaBack(detalleCitaForm)
    ).subscribe(() => this.detalleCitaService.notificarEstadoDetalleCita.emit());
  }

  crear(detalleCita: InformacionCompletaDetalleCita): void {
    detalleCita.login = this.authService.getUsuarioLogueado;
    this.detalleCitaService.guardarDetalleCita(
      TransformDetalleCita.transformDetalleCItaToDetalleCitaBack(detalleCita)
    ).subscribe(() => {
      this.detalleCitaService.notificarEstadoDetalleCita.emit();
    }, (error) => {
      console.log('QUE PASOOOOO', error.error);
      Swal.fire('Error', error.error.mensaje, 'error')
    });
  }

  save(): void {
    console.log('POR QUE ESTA MALA', this.detalleCita);
    const detalleCitaForm = this.detalleCitaFomulario.getRawValue();
    this.actualizarOGuardar(detalleCitaForm, this.detalleCita);
    this.dialogRef.close(this.detalleCita);
  }

  close(): void {
    this.dialogRef.close();
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.detalleCitaFomulario.controls[controlName].hasError(errorName);
  }
}
