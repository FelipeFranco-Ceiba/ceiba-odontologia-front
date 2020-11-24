import { getTestBed, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { ClienteService } from 'src/app/pages/services/cliente.service';

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, LocalStorageService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify(); //Verifies that no requests are outstanding.
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('crear usuario ', () => {
    const usuario = {idLogin: 1, usuario: 'Felipe', clave: 'Franco'};
    const request = httpMock.expectOne('http://localhost:8080/login/');

    service.registrarUsuario(usuario).subscribe(
      login => expect(login).toEqual(usuario)
    );

    expect(request.request.method).toEqual('POST');

    request.flush(usuario);
  })

});
