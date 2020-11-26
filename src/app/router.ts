import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesnotfoundComponent } from './pagesnotfound/pagesnotfound.component';
import { OdontologoComponent } from './pages/odontologo/odontologo.component';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [

    { path: '', redirectTo: '/detalleCitas', pathMatch: 'full' },
    { path: '**', component: PagesnotfoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        AuthRoutingModule,
        PagesRoutingModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
