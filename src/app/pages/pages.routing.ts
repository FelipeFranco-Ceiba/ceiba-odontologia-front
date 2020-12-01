import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { OdontologoComponent } from './odontologo/odontologo.component';
import { DetalleCitasComponent } from './detalle-citas/detalle-citas.component';
import { OdontologoFormularioComponent } from './odontologo/odontologo-formulario/odontologo-formulario.component';

import { ClienteFormularioComponent } from './cliente/cliente-formulario/cliente-formulario.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AuthGuard } from '../core/guard/auth.guard';
const routes: Routes = [
    {
        path: 'detalleCitas',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DetalleCitasComponent,
                data: { title: 'Detalle Citas' }
            },
            {
                path: 'odontologos',
                component: OdontologoComponent,
                data: { title: 'Detalle Citas' }
            },
            {
                path: 'odontologos/formulario-odontologo',
                component: OdontologoFormularioComponent,
                data: { title: 'Formuldario Odontologo' }
            },
            {
                path: 'clientes',
                component: ClienteComponent,
                data: { title: 'Clientes' }
            },
            {
                path: 'clientes/formulario-cliente',
                component: ClienteFormularioComponent,
                data: { title: 'Formuldario Cliente' }
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
