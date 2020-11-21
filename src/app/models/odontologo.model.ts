export interface detalleCita {
    idDetalleCita?: number;
    fechaCita: Date;
    horaCita: number;
    valorCita: number;
}

export interface Odontologo {
    idOdontologo?: number;
    nombres: string;
    apellidos: string;
    fechaIngreso: Date;
    estado?: boolean;
    detalleCitas?: detalleCita[];
}

