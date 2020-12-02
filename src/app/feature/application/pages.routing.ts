import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { AuthGuard } from '../../core/guard/auth.guard';
import { DetalleCitasComponent } from '../../shared/components/detalle-citas/detalle-citas.component';
import { OdontologoComponent } from '../../shared/components/odontologo/odontologo.component';
import { OdontologoFormularioComponent } from '../../shared/components/odontologo/odontologo-formulario/odontologo-formulario.component';
import { ClienteComponent } from '../../shared/components/cliente/cliente.component';
import { ClienteFormularioComponent } from '../../shared/components/cliente/cliente-formulario/cliente-formulario.component';
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
