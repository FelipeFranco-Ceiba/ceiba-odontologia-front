import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages.routing';

import { SharedModule } from '../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

import { OdontologoComponent } from './odontologo/odontologo.component';
import { OdontologoFormularioComponent } from './odontologo/odontologo-formulario/odontologo-formulario.component';
import { PagesComponent } from './pages.component';
import { DetalleCitasComponent } from './detalle-citas/detalle-citas.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { EstadoOdontologoPipe } from './utility/pipe/estado-odontoogo.pipe';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteFormularioComponent } from './cliente/cliente-formulario/cliente-formulario.component';
import { DetalleCitasFormularioComponent } from './detalle-citas/detalle-citas-formulario/detalle-citas-formulario.component';

@NgModule({
  declarations: [
    PagesComponent,
    OdontologoComponent,
    OdontologoFormularioComponent,
    DetalleCitasComponent,
    DetalleCitasFormularioComponent,
    EstadoOdontologoPipe,
    ClienteComponent,
    ClienteFormularioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PagesRoutingModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule
  ],
  exports: [
    OdontologoComponent
  ],
  providers: [
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ]
})
export class PagesModule { }
