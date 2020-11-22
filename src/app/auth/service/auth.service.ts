import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'ngx-webstorage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public sufix = 'login/';
  public getUsuarioLogueado: Usuario;

  constructor(private readonly httpCliente: HttpClient,
              private readonly localStorage: LocalStorageService) { }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpCliente.post<Usuario>(`${environment.endpoint}${this.sufix}`, usuario);
  }

  login(login: Usuario): Observable<boolean> {
    const headers = {'Content-Type': 'application/json'};
    return this.httpCliente.post<Usuario>(`${environment.endpoint}${this.sufix}inicio`, login, { headers })
    .pipe(map((login: Usuario) => {
      this.localStorage.store('usuario', login.usuario);
      this.getUsuarioLogueado = login;
      return true;
    }))
  }

  get usuarioLogueado(): Usuario {
    return this.localStorage.retrieve('usuario');
  }
}


