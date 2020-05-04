import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ProjectService } from 'src/app/Services/project.service';
import { Project } from 'src/app/Models/project.model';
import { toDate } from '@angular/common/src/i18n/format_date';
/* import { NgxSpinnerService } from 'ngx-spinner'; */


@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {

  formData: Project;
  projectoAdd: FormGroup;
  submitted = false;
  titulo = 'Add new project';
  constructor(private service: ProjectService/* ,
              private spinner: NgxSpinnerService */) { }

  ngOnInit() {
this.resetform();

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
      Nombre: ''
    };
  }

  onSubmit(form: NgForm) {
    /* this.spinner.show(); */
    // devuelve un observable por eso le pongo el .susbscribe ya que me va a devolver el observable como exito o error
    this.service.postProject(form.value).subscribe(
      res => {
        console.log(res);
        this.resetform(form);
        /* this.spinner.hide(); */
      },
      err => {
        console.log(err);
        /* this.spinner.show(); */
      }
    );
  }
}
