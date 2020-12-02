import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

// Componentes
//import { HeaderComponent } from './header/header.component';
import { OdontologoComponent } from './components/odontologo/odontologo.component';
import { OdontologoFormularioComponent } from './components/odontologo/odontologo-formulario/odontologo-formulario.component';
import { DetalleCitasComponent } from './components/detalle-citas/detalle-citas.component';
import { DetalleCitasFormularioComponent } from './components/detalle-citas/detalle-citas-formulario/detalle-citas-formulario.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteFormularioComponent } from './components/cliente/cliente-formulario/cliente-formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from '../feature/application/pages.routing';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { EstadoOdontologoPipe } from '../shared/utility/pipe/estado-odontoogo.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    OdontologoComponent,
    OdontologoFormularioComponent,
    DetalleCitasComponent,
    DetalleCitasFormularioComponent,
    ClienteComponent,
    ClienteFormularioComponent,
    EstadoOdontologoPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule
  ],
  exports: [
    HeaderComponent,
    CommonModule,
    BrowserModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule
  ],
  providers: [
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ]
})
export class SharedModule { }
