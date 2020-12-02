import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth-service/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formularioLogin: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              public readonly router: Router) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(): void {
    this.formularioLogin = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  login(): void {
    this.authService.login(this.formularioLogin.getRawValue()).subscribe(login => {
      this.router.navigateByUrl('/detalleCitas');
    }, (error) => {
      Swal.fire('Error', error.error.mensaje, 'error');
    });
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.formularioLogin.controls[controlName].hasError(errorName);
  }

}
