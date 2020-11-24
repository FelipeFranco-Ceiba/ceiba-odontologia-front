import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AuthRoutingModule } from './auth.routing';
import {MatButtonModule} from '@angular/material/button';
import { NgxWebstorageModule } from 'ngx-webstorage';



import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthService } from './service/auth.service';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule
  ],
  exports: [
    LoginComponent,
    RegistroComponent
  ],
  providers: []
})
export class AuthModule { }
