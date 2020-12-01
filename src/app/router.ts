import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './core/feature/auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';
import { PagesnotfoundComponent } from './core/feature/pagesnotfound/pagesnotfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/detalleCitas', pathMatch: 'full' },
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
