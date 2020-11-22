import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public formularioLogin: FormGroup;

  constructor(private readonly authService: AuthService,
    private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formularioLogin = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    })
  }

  guardarLogin() {
    this.authService.registrarUsuario(this.formularioLogin.getRawValue()).subscribe(login => console.log(login));
  }

  public hasError(controlName: string, errorName: string) {
    return this.formularioLogin.controls[controlName].hasError(errorName);
  }

}
