import { Cliente } from './cliente.model';
import { Odontologo } from './odontologo.model';
import { Usuario } from './usuario.model';

export interface DetalleCita {
    idDetalleCita?: number;
    fechaCita: Date;
    horaCita: number;
    valorCita: number;
}

export interface InformacionCompletaDetalleCita {
    idDetalleCita?: number;
    fechaCita: Date;
    horaCita: number;
    valorCita: number;
    odontologo: Odontologo;
    cliente: Cliente;
    login: Usuario;
}
