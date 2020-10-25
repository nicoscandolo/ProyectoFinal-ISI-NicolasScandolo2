import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Usuario } from 'src/app/Models/usuario.model';
// import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ProjectService } from 'src/app/Services/project.service';
import { Email } from 'src/app/Models/email.model';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  submitted = false;
  errorMessage: string;
  sendEmail: boolean;
  email: Email;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private service: ProjectService,
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
      idUsuario: 0,
      Nombre: '',
      FechaCreacion: new Date(),
      Password: '',
      isAdmin: false,
      ImagenUsuarioPath: '',
      Email: '',
    };
  }

  onSubmit(form: NgForm) {
    this.sendEmail = true;
    // devuelve un observable por eso le pongo el .susbscribe ya que me va a devolver el observable como exito o error
    this.authService.signUp(form.value).subscribe(
      res => {
        console.log(res);
        // Setear token en el localStorage
        // localStorage.setItem('token', res.data.token);
        // Redireccionar
        this.router.navigate(['/signin']);
        this.resetform(form);
      },
      err => {
        this.sendEmail = false;
        console.log(err);
        if (err.status !== 0) { this.errorMessage = err.error.message; }

        if (err.status === 0) {
          this.errorMessage = 'Unable to connect with server';
        }

      }
    );
/*     if (this.sendEmail) {
      this.service.sendEmail(this.email).subscribe(
      ( res: any ) => {
        console.log(res, 'se mando bien el mail');
      },
      err => {
        console.log(err, 'No pude enviar el mail');
        if (err.status !== 0) { this.errorMessage = err.error.message; }

        if (err.status === 0) {
          this.errorMessage = 'No pude enviar el mail. Unable to connect with server';
        }

      }
    );
   } */
  }

}
