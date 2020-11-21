import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Odontologo } from 'src/app/models/odontologo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OdontologiaService {

  public url = 'http://localhost:8080/odontologo/';

  private _notificarEstadoOdontologoActualizado = new EventEmitter<any>();

  constructor(private readonly httpCliente: HttpClient) { }

  get notificarEstadoOdontologoActualizado(): EventEmitter<any> {
    return this._notificarEstadoOdontologoActualizado;
  }

  consultarOdontologos(): Observable<Odontologo[]> {
    return this.httpCliente.get<Odontologo[]>(`${environment.endpoint}`);
  }

  actualizarOdontologo(odontologo: Odontologo): Observable<Odontologo> {
    return this.httpCliente.put<Odontologo>(`${environment.endpoint}`, odontologo);
  }

  guardarOdontologo(odontologo: Odontologo): Observable<Odontologo> {
    return this.httpCliente.post<Odontologo>(`${environment.endpoint}`, odontologo);
  }

  eliminarOdontologo(idOdontologo: number): Observable<any> {
    return this.httpCliente.delete(`${this.url}/${idOdontologo}`);
  }
}
