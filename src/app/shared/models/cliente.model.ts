import { DetalleCita } from './detalle-cita.model';

export interface Cliente {
    idCliente?: number;
    nombres: string;
    apellidos: string;
    detalleCitas?: DetalleCita[];
}
