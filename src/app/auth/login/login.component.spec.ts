import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../service/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { AuthServiceMock } from '../service/auth.service.mock';
import { Usuario } from 'src/app/models/usuario.model';
import { DetalleCitasComponent } from 'src/app/pages/detalle-citas/detalle-citas.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;

  const REQUIRED = 'required';
  const USUARIO = 'usuario';
  const CLAVE = 'clave';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        LocalStorageService,
        AuthService,
        { provide: AuthService, useClass: AuthServiceMock }
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'detalleCitas', component: DetalleCitasComponent }
        ])]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
        service = TestBed.inject(AuthService);
      });
  });

  beforeEach(() => {
    service = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalis when empty', () => {
    expect(component.formularioLogin.valid).toBeFalsy();
  });

  it('form invalis field empty', () => {
    const usuario = component.formularioLogin.controls[USUARIO];
    const clave = component.formularioLogin.controls[CLAVE];
    usuario.setValue('');
    clave.setValue('');
    expect(usuario.hasError(REQUIRED)).toBeTruthy();
    expect(clave.hasError(REQUIRED)).toBeTruthy();
  });

  it('creacion del formulario de login', () => {
    const usuario = component.formularioLogin.controls[USUARIO];
    const clave = component.formularioLogin.controls[CLAVE];
    usuario.setValue('');
    clave.setValue('');
    component.crearFormulario();
    expect(component.formularioLogin.valid).toBeFalsy();
  });

  it('Se ejecuta el metodo hasError cuando cualquier campo del formulario esta vacio, ' +
    'debe retornar true', () => {
      const usuario = component.formularioLogin.controls[USUARIO];
      const clave = component.formularioLogin.controls[CLAVE];
      usuario.setValue('');
      clave.setValue('Felipe Prueba Clave');
      expect(component.hasError('usuario', 'required')).toBeTrue();
    });

  it('Se ejecuta el metodo hasError cuando los campos del formulario son ' +
    'validos, debe retornar false', () => {
      const usuario = component.formularioLogin.controls[USUARIO];
      const clave = component.formularioLogin.controls[CLAVE];
      usuario.setValue('Hola');
      clave.setValue('Felipe Prueba Clave');
      expect(component.hasError('usuario', 'required')).toBeFalse();
    });

  it('Se ejecuta el metodo login cuando los campos del formulario son ' +
    'validos y el usuario esta registrado, debe redireccionar a detalleCita', fakeAsync(() => {
      const informacionLogin: Usuario = { idLogin: 1, usuario: 'Felipe', clave: 'Franco' };
      const servicioLogin = spyOn(service, 'login').and.returnValue(of(true));
      component.formularioLogin.patchValue(informacionLogin);
      component.login();

      fixture.detectChanges();
      expect(servicioLogin.calls.any()).toEqual(true);
    }));

  it('Se ejecuta el metodo login cuando los campos del formulario son ' +
    'validos y el usuario esta registrado, debe redireccionar a detalleCita error', fakeAsync(() => {
      const informacionLogin: Usuario = { idLogin: 1, usuario: 'Felipe', clave: 'Franco' };
      const servicioLogin = spyOn(service, 'login').and.returnValue(of(false));
      component.formularioLogin.patchValue(informacionLogin);
      component.login();

      fixture.detectChanges();
      expect(servicioLogin.calls.any()).toEqual(true);
    }));
});
