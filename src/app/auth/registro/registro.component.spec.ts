import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from 'ngx-webstorage';
import { of } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from '../service/auth.service';
import { AuthServiceMock } from '../service/auth.service.mock';

import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let service: AuthService;

  const REQUIRED = 'required';
  const USUARIO = 'usuario';
  const CLAVE = 'clave';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroComponent],
      providers: [
        LocalStorageService,
        AuthService,
        { provide: AuthService, useClass: AuthServiceMock }
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RegistroComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
        service = TestBed.inject(AuthService);
      });
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

  it('Cuando se ejecuta el metodo guardarLogin, ' +
    'debe enviar la informacion a guardar y retoarnar el usuario creado', () => {
      const informacionLogin: Usuario = { idLogin: 1, usuario: 'Felipe', clave: 'Franco' };
      const servicioLogin = spyOn(service, 'registrarUsuario').and.returnValue(of(informacionLogin));
      component.formularioLogin.patchValue(informacionLogin);
      component.guardarLogin();
      expect(servicioLogin.calls.any()).toEqual(true);
    });
});
