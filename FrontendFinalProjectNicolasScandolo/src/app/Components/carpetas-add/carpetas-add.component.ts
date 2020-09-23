import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carpeta } from 'src/app/Models/carpeta.model';
import { Consulta } from 'src/app/Models/consulta.model';
import { Email } from 'src/app/Models/email.model';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-carpetas-add',
  templateUrl: './carpetas-add.component.html',
  styleUrls: ['./carpetas-add.component.css']
})
export class CarpetasAddComponent {
    // tslint:disable-next-line:variable-name
    @ViewChild('modal_1') modal_1: TemplateRef<any>;
    @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;
    @Output() messageEvent = new EventEmitter<boolean>();
    backdrop: any;
    nombre = '';
    private CarpetaNew: Carpeta;
    sendEmail: boolean;
    email: Email;

    constructor(
      private activatedRoute: ActivatedRoute,
      private service: ProjectService,
      private router: Router,
      private http: HttpClient) {
        this.nombre = '';

        this.CarpetaNew = {
          idCarpeta: 0,
          nombre: '',
          descripcion: '',
          idProjecto: this.activatedRoute.snapshot.params.query,
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
        this.backdrop.style = 'opacity:0.6 !important';
        this.backdrop.className = 'modal-backdrop';
        document.body.appendChild(this.backdrop);
    }

    closeDialog() {
      this.nombre = '';
      this.vc.clear();
      document.body.removeChild(this.backdrop);
    }

    publicarCarpeta() {
      this.sendEmail = true;
      console.log(this.nombre);
      this.CarpetaNew.nombre = this.nombre;
      this.CarpetaNew.idProjecto = this.activatedRoute.snapshot.params.query;
      console.log(this.CarpetaNew, 'carpeta antes de enviar');
        // devuelve un observable por eso le pongo el .susbscribe ya que me va a devolver el observable como exito o error
      this.service.postCarpeta(this.CarpetaNew).subscribe(
      res => {
        console.log(res);
        console.log('la carpeta se agrego correctamente');
        this.email = {
          projectId: this.CarpetaNew.idProjecto,
          tipo: 'consulta'
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
