import { detalleCita } from './detalle-cita.model';

export interface Cliente {
    idCliente?: number,
    nombres: string;
    apellidos: string;
    detalleCitas?: detalleCita[] 
}