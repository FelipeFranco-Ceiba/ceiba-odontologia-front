import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subscription } from 'rxjs';
import { InformacionCompletaDetalleCita } from 'src/app/shared/models/detalle-cita.model';
import { Odontologo } from 'src/app/shared/models/odontologo.model';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { DetalleCitaService } from 'src/app/core/services/detalle-cita.service';
import { OdontologiaService } from 'src/app/core/services/odontologia.service';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { AuthService } from 'src/app/core/auth-service/auth.service';
import { TransformDetalleCita } from 'src/app/shared/utility/transform/transformarDetalleCitaToBack';

@Component({
  selector: 'app-detalle-citas-formulario',
  templateUrl: './detalle-citas-formulario.component.html',
  styleUrls: ['./detalle-citas-formulario.component.css']
})
export class DetalleCitasFormularioComponent implements OnInit, OnDestroy {

  subscription: Subscription;
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
      horaCita: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      valorCita: ['35000', [Validators.required]],
      fechaCita: ['', Validators.required],
    });
  }

  cargarFormulario(): void {
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
    this.subscription = this.odontologoService.consultarOdontologos()
      .subscribe(listaOdontologo => this.odontologos = listaOdontologo);
  }

  cargarCliente(): void {
    this.subscription = this.clienteService.consultarClientes().subscribe(listaCliente => this.clientes = listaCliente);
  }

  odontologoSeleccionado(odontologoSeleccionado: Odontologo, o1: Odontologo): boolean {
    return o1.idOdontologo === odontologoSeleccionado.idOdontologo ? true : false;
  }

  clienteSeleccionado(clienteSeleccionado: Cliente, o1: Cliente): boolean {
    return o1.idCliente === clienteSeleccionado.idCliente ? true : false;
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
    this.subscription = this.detalleCitaService.actualizarDetalleCita(
      TransformDetalleCita.transformDetalleCItaToDetalleCitaBack(detalleCitaForm)
    ).subscribe(() => {
      this.detalleCitaService.notificarEstadoDetalleCita.emit()
    }, (error) => {
      Swal.fire('Error', error.error.mensaje, 'error');
    });
  }

  crear(detalleCita: InformacionCompletaDetalleCita): void {
    detalleCita.login = this.authService.getUsuarioLogueado;
    this.subscription = this.detalleCitaService.guardarDetalleCita(
      TransformDetalleCita.transformDetalleCItaToDetalleCitaBack(detalleCita)
    ).subscribe(() => {
      this.detalleCitaService.notificarEstadoDetalleCita.emit();
    }, (error) => {
      Swal.fire('Error', error.error.mensaje, 'error');
    });
  }

  save(): void {
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
