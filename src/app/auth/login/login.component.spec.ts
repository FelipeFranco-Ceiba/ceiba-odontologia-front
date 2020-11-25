import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../service/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [LocalStorageService, AuthService],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalis when empty', () => {
    expect(component.formularioLogin.valid).toBeFalsy();
  });

  it('form invalis field empty', () => {
    const usuario = component.formularioLogin.controls['usuario'];
    const clave = component.formularioLogin.controls['clave'];
    usuario.setValue('');
    clave.setValue('');
    expect(usuario.hasError('required')).toBeTruthy();
    expect(clave.hasError('required')).toBeTruthy();
  });


  /*fit('login invalid ', () => {
    const informacionLogin = {idLogin: 1, usuario: 'Felipe', clave: 'Franco'};
    let usuario = component.formularioLogin.patchValue(informacionLogin);
    usuario.setValue("");
    clave.setValue("");
    expect(usuario.hasError('required')).toBeTruthy();
    expect(clave.hasError('required')).toBeTruthy();
  }); */
});
