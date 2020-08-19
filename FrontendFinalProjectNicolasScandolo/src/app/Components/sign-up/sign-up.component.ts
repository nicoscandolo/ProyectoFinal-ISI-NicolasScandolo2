import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Usuario } from 'src/app/Models/usuario.model';
// import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  submitted = false;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }
    // private spinner: NgxSpinnerService) { }

  ngOnInit() {
      this.resetform();
    }

  resetform(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }

    this.authService.formData = {
      IdUsuario: 0,
      Nombre: '',
      FechaCreacion: new Date(),
      Password: '',
      IsAdmin: false,
      ImagenUsuarioPath: '',
    };
  }

  onSubmit(form: NgForm) {

    // devuelve un observable por eso le pongo el .susbscribe ya que me va a devolver el observable como exito o error
    this.authService.signUp(form.value).subscribe(
      res => {
        console.log(res);
        // Setear token en el localStorage
        // localStorage.setItem('token', res.data.token);
        // Redireccionar
        this.router.navigate(['/landingpage']);
        this.resetform(form);
      },
      err => {
        console.log(err);
        if (err.status !== 0) { this.errorMessage = err.error.message; }

        if (err.status === 0) {
          this.errorMessage = 'Unable to connect with server';
        }

      }
    );
  }

}
