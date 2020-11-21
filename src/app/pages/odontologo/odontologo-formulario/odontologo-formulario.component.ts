import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Odontologo } from 'src/app/models/odontologo.model';
import { OdontologiaService } from '../../services/odontologia.service';

@Component({
  selector: 'app-odontologo-formulario',
  templateUrl: './odontologo-formulario.component.html',
  styleUrls: ['./odontologo-formulario.component.css']
})
export class OdontologoFormularioComponent implements OnInit {

  odontologo: Odontologo;
  titulo: string;
  deshabilitar: boolean;

  public odontologoFormulario: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private dialogRef: MatDialogRef<OdontologoFormularioComponent>,
    private readonly odontologoService: OdontologiaService,
    @Inject(MAT_DIALOG_DATA) data: Odontologo) {
    this.odontologo = data;
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarFormulario();
  }

  crearFormulario() {
    this.odontologoFormulario = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      estado: ['', Validators.required],
    })
  }

  cargarFormulario() {
    console.log('SII ENTRO', this.odontologo);
    if (this.odontologo) {
      console.log('Editar');
      this.titulo = 'Editar';
      this.odontologoFormulario.patchValue(this.odontologo);
    } else {
      console.log('Crear');
      this.titulo = 'Crear';
    }
  }

  transformarDate(fechaIngreso: any): any {
    return new Date(fechaIngreso).toLocaleString("es-ES");
  }

  actualizarOGuardar(odontologoForm: Odontologo, odontologo?: Odontologo) {
    odontologoForm.fechaIngreso = this.transformarDate(odontologoForm.fechaIngreso);
    if (odontologoForm && odontologo && odontologo.idOdontologo) {
      odontologoForm.idOdontologo = odontologo.idOdontologo;
      this.odontologoService.actualizarOdontologo(odontologoForm).subscribe(() =>
        this.odontologoService.notificarEstadoOdontologoActualizado.emit()
      );
    } else {
      this.odontologoService.guardarOdontologo(odontologoForm).subscribe(() =>
        this.odontologoService.notificarEstadoOdontologoActualizado.emit()
      );
    }
  }

  save() {
    const odontologoForm: Odontologo = this.odontologoFormulario.value;

    this.actualizarOGuardar(odontologoForm, this.odontologo);

    this.dialogRef.close(odontologoForm);
  }

  close() {
    this.dialogRef.close();
  }

  public hasError(controlName: string, errorName: string) {
    return this.odontologoFormulario.controls[controlName].hasError(errorName);
  }

  displayedColumns: string[] = ['nombres', 'apellidos', 'fechaIngreso', 'estado'];
}
