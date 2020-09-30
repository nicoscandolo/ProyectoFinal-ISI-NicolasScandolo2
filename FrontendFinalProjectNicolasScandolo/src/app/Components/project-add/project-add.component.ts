import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ProjectService } from 'src/app/Services/project.service';
import { Project } from 'src/app/Models/project.model';
import { toDate } from '@angular/common/src/i18n/format_date';
import { ActivatedRoute, Router } from '@angular/router';
/* import { NgxSpinnerService } from 'ngx-spinner'; */


@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  Tipos: string[];
  formData: Project;
  projectoAdd: FormGroup;
  submitted = false;
  titulo = 'Add new project';
  constructor(private service: ProjectService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
    /* ,
              private spinner: NgxSpinnerService */) { }

  ngOnInit() {
this.resetform();
this.Tipos = ['Ciencia', 'Ingenieria', 'Arte', 'Matematica', 'Literatura', 'Sistemas', 'Otros'];

/*     this.projectoAdd = new FormGroup({
      name: new FormControl(this.formData.Nombre, Validators.required),
      genre: new FormControl(this.formData.Descripcion, Validators.required),
    }); */
  }

  resetform(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }

    this.service.formData = {
      IdProyecto: 0,
      Descripcion: '',
      FechaCreacion: new Date(),
      Nombre: '',
      Tipo: 'Otros'
    };
  }


  onSubmit(form: NgForm) {

    /* this.spinner.show(); */
    const idUsuario = this.activatedRoute.snapshot.params.idUsuario;
    const tipoU = this.activatedRoute.snapshot.params.tipoUsuario;
    // devuelve un observable por eso le pongo el .susbscribe ya que me va a devolver el observable como exito o error
    this.service.postProject(form.value, idUsuario).subscribe(
      res => {
        console.log(res);
        this.resetform(form);
        this.router.navigate(['landingpage', idUsuario, tipoU]);
        /* this.spinner.hide(); */
      },
      err => {
        console.log(err);
        /* this.spinner.show(); */
      }
    );
  }
}
