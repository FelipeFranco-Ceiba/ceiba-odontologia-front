import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public sufix = 'login/';

  constructor(private readonly httpCliente: HttpClient) { }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpCliente.post<Usuario>(`${environment.endpoint}${this.sufix}`, usuario);
  }
}
