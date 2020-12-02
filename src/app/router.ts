import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './feature/auth/auth.routing';
import { PagesRoutingModule } from './feature/application/pages.routing';
import { PagesnotfoundComponent } from './feature/pagesnotfound/pagesnotfound.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { DetalleCitasComponent } from './shared/components/detalle-citas/detalle-citas.component';
import { AuthGuard } from './core/guard/auth.guard';
import { PagesComponent } from './feature/application/pages.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'detalleCitas',
    component: PagesComponent,
    canActivate: [AuthGuard] },
  { path: '**', component: PagesnotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
