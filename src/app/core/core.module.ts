import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthService } from './auth-service/auth.service';
import { ClienteService } from './services/cliente.service';
import { DetalleCitaService } from './services/detalle-cita.service';
import { OdontologiaService } from './services/odontologia.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ClienteService,
    OdontologiaService,
    DetalleCitaService
  ]
})
export class CoreModule {}
