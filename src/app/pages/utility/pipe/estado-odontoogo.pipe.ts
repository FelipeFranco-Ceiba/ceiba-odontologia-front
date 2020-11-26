import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'estadoOdontologo' })
export class EstadoOdontologoPipe implements PipeTransform {
    transform(estado: boolean) {
        return estado ? 'Activo' : 'Inactivo';
    }
}
