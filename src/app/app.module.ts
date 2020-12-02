import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './feature/auth/auth.module';
import { AppRoutingModule } from './router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PagesnotfoundComponent } from './feature/pagesnotfound/pagesnotfound.component';
import { CoreModule } from './core/core.module';
import { EstadoOdontologoPipe } from './shared/utility/pipe/estado-odontoogo.pipe';
import { PagesComponent } from './feature/application/pages.component';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesnotfoundComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    CoreModule,
    AppRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatToolbarModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  exports: [
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
