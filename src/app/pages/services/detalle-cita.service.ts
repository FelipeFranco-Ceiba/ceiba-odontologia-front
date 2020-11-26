import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformacionCompletaDetalleCita } from 'src/app/models/detalle-cita.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleCitaService {

  public sufix = 'detalleCita';

  private notificarEstado = new EventEmitter<any>();

  constructor(private readonly httpCliente: HttpClient) { }

  get notificarEstadoDetalleCita(): EventEmitter<any> {
    return this.notificarEstado;
  }

  consultarDetalleCita(): Observable<InformacionCompletaDetalleCita[]> {
    return this.httpCliente.get<InformacionCompletaDetalleCita[]>(`${environment.endpoint}${this.sufix}`);
  }

  guardarDetalleCita(detalleCita: InformacionCompletaDetalleCita): Observable<InformacionCompletaDetalleCita> {
    return this.httpCliente.post<InformacionCompletaDetalleCita>(`${environment.endpoint}${this.sufix}`, detalleCita);
  }

  actualizarDetalleCita(detalleCita: InformacionCompletaDetalleCita): Observable<InformacionCompletaDetalleCita> {
    const headers = {'Content-Type': 'application/json'};
    return this.httpCliente.put<InformacionCompletaDetalleCita>(`${environment.endpoint}${this.sufix}`, detalleCita, {headers});
  }

}
