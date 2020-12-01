import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService,
              private readonly router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.getUsuarioLogueado &&
          this.authService &&
          this.authService.getUsuarioLogueado.usuario === this.authService.usuarioLogueado) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
  }
}
