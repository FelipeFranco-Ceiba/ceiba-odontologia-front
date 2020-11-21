import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { OdontologoComponent } from './odontologo/odontologo.component';
import { DetalleCitasComponent } from './detalle-citas/detalle-citas.component';
import { OdontologoFormularioComponent } from './odontologo/odontologo-formulario/odontologo-formulario.component';
const routes: Routes = [
    {
        path: 'detalleCitas',
        component: PagesComponent,
        children: [
            { path: '', component: DetalleCitasComponent, data: { title: 'Detalle Citas' } },
            { path: 'odontologos', component: OdontologoComponent, data: { title: 'Detalle Citas' } },
            { path: 'odontologos/formulario-odontologo', component: OdontologoFormularioComponent, data: { title: 'Formuldario Odontologo' } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }