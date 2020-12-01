import { DetalleCita } from './detalle-cita.model';
export interface Odontologo {
    idOdontologo?: number;
    nombres: string;
    apellidos: string;
    fechaIngreso: Date;
    estado?: boolean;
    detalleCitas?: DetalleCita[];
}

