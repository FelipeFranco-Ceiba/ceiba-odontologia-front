import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Odontologo } from 'src/app/shared/models/odontologo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OdontologiaService {

  public sufix = 'odontologo/';

  private notificarEstadoOdontologo = new EventEmitter<any>();

  constructor(private readonly httpCliente: HttpClient) { }

  get notificarEstadoOdontologoActualizado(): EventEmitter<any> {
    return this.notificarEstadoOdontologo;
  }

  consultarOdontologos(): Observable<Odontologo[]> {
    return this.httpCliente.get<Odontologo[]>(`${environment.endpoint}${this.sufix}`);
  }

  actualizarOdontologo(odontologo: Odontologo): Observable<Odontologo> {
    return this.httpCliente.put<Odontologo>(`${environment.endpoint}${this.sufix}`, odontologo);
  }

  guardarOdontologo(odontologo: Odontologo): Observable<Odontologo> {
    return this.httpCliente.post<Odontologo>(`${environment.endpoint}${this.sufix}`, odontologo);
  }

  eliminarOdontologo(idOdontologo: number): Observable<any> {
    return this.httpCliente.delete(`${environment.endpoint}${this.sufix}/${idOdontologo}`);
  }
}
