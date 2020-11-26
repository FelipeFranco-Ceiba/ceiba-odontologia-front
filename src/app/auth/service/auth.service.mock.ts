import { Observable, of } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';


export class AuthServiceMock {
  public login(usuario: Usuario): Observable<boolean> {
    return of(true);
  }

  public registrarUsuario(usuario: Usuario): Observable<Usuario> {
    const informacionLogin: Usuario = {idLogin: 1, usuario: 'Felipe', clave: 'Franco'};
    return of(informacionLogin);
  }
}