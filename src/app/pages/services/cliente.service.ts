import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public sufix = 'cliente/';

  private _NotificarEstadoCliente = new EventEmitter<any>();

  constructor(private readonly httpCliente: HttpClient) { }


  get notificarEstadoCliente(): EventEmitter<any> {
    return this._NotificarEstadoCliente;
  }

  consultarClientes(): Observable<Cliente[]> {
    return this.httpCliente.get<Cliente[]>(`${environment.endpoint}${this.sufix}`);
  }

  actualizarCliente(odontologo: Cliente): Observable<Cliente> {
    return this.httpCliente.put<Cliente>(`${environment.endpoint}${this.sufix}`, odontologo);
  }

  guardarCliente(odontologo: Cliente): Observable<Cliente> {
    return this.httpCliente.post<Cliente>(`${environment.endpoint}${this.sufix}`, odontologo);
  }

  eliminarCliente(idOdontologo: number): Observable<any> {
    return this.httpCliente.delete(`${environment.endpoint}${this.sufix}/${idOdontologo}`);
  }
}
