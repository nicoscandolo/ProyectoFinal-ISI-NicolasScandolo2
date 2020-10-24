import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
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
    // tslint:disable-next-line:variable-name
    @ViewChild('modal_1') modal_1: TemplateRef<any>;
    @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;
    @Output() messageEvent = new EventEmitter<boolean>();
    backdrop: any;



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

    this.vc.clear();
    document.body.removeChild(this.backdrop);
    this.messageEvent.emit(true);
  }


  showDialog() {
    // tslint:disable-next-line:prefer-const
    let view = this.modal_1.createEmbeddedView(null);
    this.vc.insert(view);
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
    this.modal_1.elementRef.nativeElement.previousElementSibling.style.display = 'block';
    this.backdrop = document.createElement('DIV');
    this.backdrop.style = 'opacity:0.6 !important';
    this.backdrop.className = 'modal-backdrop';
    document.body.appendChild(this.backdrop);
}

closeDialog() {
  this.resetform();
  this.vc.clear();
  document.body.removeChild(this.backdrop);
}



}
