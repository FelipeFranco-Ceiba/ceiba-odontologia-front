import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [AuthService, LocalStorageService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify(); //Verifies that no requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('crear usuario ', () => {
    const usuario = {idLogin: 1, usuario: 'Felipe', clave: 'Franco'};

    service.registrarUsuario(usuario).subscribe(
      login => expect(login).toEqual(usuario)
    );

    const request = httpMock.expectOne(environment.endpoint + 'login/');
    expect(request.request.method).toEqual('POST');

    request.flush(usuario);
  });

});
