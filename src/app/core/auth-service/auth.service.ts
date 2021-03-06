import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'ngx-webstorage';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/shared/models/usuario.model';

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
    .pipe(map((usuario: Usuario) => {
      this.localStorage.store('usuario', usuario.usuario);
      this.getUsuarioLogueado = usuario;
      return true;
    }));
  }

  get usuarioLogueado(): string {
    return this.localStorage.retrieve('usuario');
  }
}


