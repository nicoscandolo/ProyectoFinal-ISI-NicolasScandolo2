import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carpeta } from 'src/app/Models/carpeta.model';
import { Email } from 'src/app/Models/email.model';
import { UsuarioProyecto } from 'src/app/Models/usuario-proyecto.model';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent {



  // tslint:disable-next-line:variable-name
  @ViewChild('modal_1') modal_1: TemplateRef<any>;
  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;
  @Output() messageEvent = new EventEmitter<boolean>();
  backdrop: any;
  nombre = '';
  private usuarioNewInProject: UsuarioProyecto;
  sendEmail: boolean;
  email: Email;
  view: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ProjectService,
    private router: Router,
    private http: HttpClient) {

      this.view = this.activatedRoute.snapshot.params.tipoUsuario;

      this.nombre = '';

      this.usuarioNewInProject = {
        idUsuario: 1000,
        idProjecto: this.activatedRoute.snapshot.params.query,
        isAdmin: false,
      };
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
    this.nombre = '';
    this.vc.clear();
    document.body.removeChild(this.backdrop);
  }

  agregarUsuario() {
    this.sendEmail = true;
    console.log(this.nombre);
    console.log(this.usuarioNewInProject, 'usuario antes de enviar');
      // devuelve un observable por eso le pongo el .susbscribe ya que me va a devolver el observable como exito o error
    this.service.postUsuariosProjecto(this.usuarioNewInProject).subscribe(
    res => {
      console.log(res);
      console.log('el usuario se agrego correctamente');
      this.email = {
        projectId: this.usuarioNewInProject.idProjecto,
        tipo: 'welcome a usuario en proyecto'
      };
    },
    err => {
      this.sendEmail = false;
      console.log(err, 'la carpeta NO se agrego correctamente');
      /* this.spinner.show(); */
    }
  );



    this.vc.clear();
    document.body.removeChild(this.backdrop);
    this.messageEvent.emit(true);

    if (this.sendEmail) {

      setTimeout(() => {
        console.log('waiting');
        this.service.sendEmail(this.email).subscribe(
          ( res: any ) => {
            console.log(res, 'esperando a que se mande bien el mail');
          },
          err => {
            console.log(err, 'No pude enviar el mail');

          }
        );
      }, 5000);

   }
  }



}
