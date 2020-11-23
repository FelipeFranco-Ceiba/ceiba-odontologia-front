import { InformacionCompletaDetalleCita } from 'src/app/models/detalle-cita.model';

export class TransformDetalleCita {

    static transformarDate(fechaIngreso: any): any {
        return new Date(fechaIngreso).toLocaleString("es-ES");
    }

    static transformDetalleCItaToDetalleCitaBack(detalleCita): InformacionCompletaDetalleCita {
        const fechaCita = this.transformarDate(detalleCita.fechaCita);
        detalleCita.nombresOdontologo.fechaIngreso = this.transformarDate(detalleCita.nombresOdontologo.fechaIngreso);
        console.log(detalleCita);
        return {
            idDetalleCita: detalleCita.idDetalleCita,
            fechaCita,
            horaCita: detalleCita.horaCita,
            valorCita: detalleCita.valorCita,
            odontologo: detalleCita.nombresOdontologo,
            cliente: detalleCita.nombresCliente,
            login: detalleCita.login
        }
    }
}