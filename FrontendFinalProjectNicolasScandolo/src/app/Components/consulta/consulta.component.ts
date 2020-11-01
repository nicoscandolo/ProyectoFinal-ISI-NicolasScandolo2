import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';
import { Consulta } from 'src/app/Models/consulta.model';
import { NgForm } from '@angular/forms';
import { ComentarioConsulta } from 'src/app/Models/comentario-consulta.model';
import { Email } from 'src/app/Models/email.model';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  @Input() consulta: Consulta;
  @Output() messageEvent = new EventEmitter<boolean>();

  private comentariosList: any = [];
  private errorMessage: string;
  private showButton: boolean;
  private showcoments: boolean;
  private ComentarioConsultaNew: ComentarioConsulta;
  private descripcion: string;
  email: Email;
  sendEmail: boolean;
  message: any;
  Admin: boolean;

  constructor(
    private route: ActivatedRoute,
    private service: ProjectService,
    private router: Router,
    private http: HttpClient
  ) { }




  resetform(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }

    this.ComentarioConsultaNew = {
      idComentarioConsulta: 0,
      idConsulta: this.consulta.idConsulta,
      nombreUsuario: '',
      descripcion: '',
      puntuacion: 0,
      IdUsuario: this.route.snapshot.params.idUsuario,
      fechaCreacion: new Date(),
      fechaModificacion: new Date(),
      pathUsuario: '',
    };

    console.log(this.ComentarioConsultaNew);
  }


  ngOnInit() {
    this.showButton = true;
/*     this.showcoments = false; */
    this.resetform();
    console.log(this.consulta);

  //  const idProyecto = this.route.snapshot.params.query;
    const idUsuario = this.route.snapshot.params.idUsuario;
    const tipoU = this.route.snapshot.params.tipoUsuario;
    const viewUser = this.route.snapshot.params.viewUser;
    if (tipoU === 'true' || viewUser === 'true') { this.Admin = true; }
  }

  HideComents(id: number): void {
        this.showButton = true;
/*         this.showcoments = false; */
        this.comentariosList = null;
      }


  ShowComents(id: number): void {
    this.service.searchComentariossList(id).subscribe(
      (response: any) => {
        this.showButton = false;
        const testt = response;
        this.comentariosList = testt;
        console.log(this.comentariosList);
      },
      err => {
        console.log(err);
        if (err.Status !== 0) { this.errorMessage = err.error.message; } else {
          this.errorMessage = 'Unable to connect with server';
        }
      }
    );
  }

CrearComentarioConsulta(descripcionHtml: string) {
  this.sendEmail = true;
  this.ComentarioConsultaNew.descripcion = descripcionHtml;

  console.log('TestingComentarioConsulta', this.consulta, descripcionHtml);
  // devuelve un observable por eso le pongo el .susbscribe ya que me va a devolver el observable como exito o error
  this.service.postComentarioConsulta(this.ComentarioConsultaNew).subscribe(
    res => {
      this.IncrementoComentariosConsulta();
      console.log(res);
      this.descripcion = '';
      this.ShowComents(this.consulta.idConsulta);
    },
    err => {
      this.sendEmail = false;
      console.log(err);
      this.descripcion = 'Error. Intente cargar mas tarde';
      /* this.spinner.show(); */
    }
  );



  this.email = {
    idConsulta: this.consulta.idConsulta,
    projectId: this.route.snapshot.params.query,
    userId: this.route.snapshot.params.idUsuario,
    tipo: 'ComentarioConsulta',
  };

  if (this.sendEmail) {
    this.service.sendEmail(this.email).subscribe(
    ( res: any ) => {
      console.log(res, 'se mando bien el mail');
    },
    err => {
      console.log(err, 'No pude enviar el mail');
      if (err.status !== 0) { this.message = err.error.message; }

      if (err.status === 0) {
        this.message = 'No pude enviar el mail. Unable to connect with server';
      }

    }
  );
 }


}

IncrementoPuntuacion() {


  this.service.Incremento(this.consulta, 0).subscribe(
    res => {
      console.log(res, 'se incremento la puntuacion de la consulta');
      this.consulta.puntuacion += 1;

    },
    err => {
      console.log(err);
      this.descripcion = 'Error. Intente cargar mas tarde';
      /* this.spinner.show(); */
    }
  );
}

IncrementoComentariosConsulta() {

  this.service.Incremento(this.consulta, 1 ).subscribe(
    res => {
      console.log(res);
      this.consulta.cantidadComentarios += 1;

    },
    err => {
      console.log(err);
      this.descripcion = 'Error. Intente cargar mas tarde';
      /* this.spinner.show(); */
    }
  );
}

DeleteConsulta() {

  this.service.deleteConsulta(this.consulta.idConsulta).subscribe(
    res => {
      console.log(res, 'se elimino la consulta');
      setTimeout(() => {
        this.messageEvent.emit(true);
      }, 500);
    },
    err => {
      console.log(err);
      this.descripcion = 'Error. Intente cargar mas tarde';
      /* this.spinner.show(); */
    }
  );



}


}
