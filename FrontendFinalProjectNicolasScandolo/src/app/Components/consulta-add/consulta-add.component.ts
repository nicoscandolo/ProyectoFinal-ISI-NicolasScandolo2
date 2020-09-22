import { Component, OnInit, ElementRef, ViewChild, TemplateRef, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';
import { HttpClient } from '@angular/common/http';
import { Consulta } from 'src/app/Models/consulta.model';
import { Email } from 'src/app/Models/email.model';
/* import { ConsultasListComponent } from '../consultas-list/consultas-list.component'; */

@Component({
  selector: 'app-consulta-add',
  templateUrl: './consulta-add.component.html',
  styleUrls: ['./consulta-add.component.css']
})
export class ConsultaAddComponent {

  // tslint:disable-next-line:variable-name
  @ViewChild('modal_1') modal_1: TemplateRef<any>;
  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;
  @Output() messageEvent = new EventEmitter<boolean>();
  backdrop: any;
  descripcion = '';
  private ConsultaNew: Consulta;
  sendEmail: boolean;
  email: Email;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ProjectService,
    private router: Router,
    private http: HttpClient) {
      this.descripcion = '';

      this.ConsultaNew = {
        idConsulta: 0,
        asunto: '',
        descripcion: '',
        puntuacion: 0,
        IdProyecto: this.activatedRoute.snapshot.params.query,
        IdUsuario: this.activatedRoute.snapshot.params.idUsuario,
        fechaCreacion: new Date(),
        fechaModificacion: new Date(),
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
      this.backdrop.className = 'modal-backdrop';
      document.body.appendChild(this.backdrop);
  }

  closeDialog() {
    this.descripcion = '';
    this.vc.clear();
    document.body.removeChild(this.backdrop);
  }

  publicarConsulta() {
    this.sendEmail = true;
    console.log(this.descripcion);
    this.ConsultaNew.descripcion = this.descripcion;
    this.ConsultaNew.IdUsuario = this.activatedRoute.snapshot.params.idUsuario;
    this.ConsultaNew.IdProyecto = this.activatedRoute.snapshot.params.query;
    this.ConsultaNew.puntuacion = 0;

    console.log(this.ConsultaNew);
      // devuelve un observable por eso le pongo el .susbscribe ya que me va a devolver el observable como exito o error
    this.service.postConsulta(this.ConsultaNew).subscribe(
    res => {
      console.log(res);
      console.log('la consulta se agrego correctamente');
      this.email = {
        projectId: this.ConsultaNew.IdProyecto,
        tipo: 'consulta'
      };
    },
    err => {
      this.sendEmail = false;
      console.log(err, 'la consulta NO se agrego correctamente');
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
