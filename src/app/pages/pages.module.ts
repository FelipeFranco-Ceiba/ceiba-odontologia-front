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

import { OdontologoComponent } from './odontologo/odontologo.component';
import { OdontologoFormularioComponent } from './odontologo/odontologo-formulario/odontologo-formulario.component';
import { PagesComponent } from './pages.component';
import { DetalleCitasComponent } from './detalle-citas/detalle-citas.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { EstadoOdontologoPipe } from './utility/pipe/estado-odontoogo.pipe';

@NgModule({
  declarations: [
    PagesComponent,
    OdontologoComponent,
    OdontologoFormularioComponent,
    DetalleCitasComponent,
    EstadoOdontologoPipe
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
    MatRadioModule
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
