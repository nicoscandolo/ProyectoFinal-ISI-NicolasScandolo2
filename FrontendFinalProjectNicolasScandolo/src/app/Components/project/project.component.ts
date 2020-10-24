import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from 'src/app/Models/email.model';
import { RequestToProyecto } from 'src/app/Models/request-to-proyecto.model';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project: any;
  @Input() tipo: any;
  @Output() messageEvent = new EventEmitter<boolean>();
  userViewProject: any;
  solicitudEnviada: boolean;
  requestToProyecto: RequestToProyecto;
  message: any;
  sendEmail: boolean;
  public email: Email;

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              private service: ProjectService) {
                this.requestToProyecto = {
                  idProyecto : 0,
                  idUsuario : this.activatedRoute.snapshot.params.idUsuario,

                };
               }

  ngOnInit() {
    console.log(this.tipo);
  }

  goToDetails(project: any) {
    switch (this.tipo) {
      case 'Mis proyectos': {

        this.getUserType( project.idProyecto);
        console.log( project.idProyecto);
        console.log(this.userViewProject, 'a ver que onda el userrr');
        const idUsuario = this.activatedRoute.snapshot.params.idUsuario;
        const tipoU = this.activatedRoute.snapshot.params.tipoUsuario;

        console.log('waiting go to project', this.userViewProject );
        setTimeout(() => {
          this.route.navigate(['landingpage', idUsuario, tipoU, 'project-details', project.idProyecto, this.userViewProject, 0]);
        }, 500);

        break;
      }
      case 'Todos los proyectos': {
        this.sendEmail = true;
        this.requestToProyecto.idProyecto = project.idProyecto;
        this.service.postRequestToProyecto(this.requestToProyecto).subscribe(
          res => {
            // tslint:disable-next-line:max-line-length
            console.log(res, 'Se mando bien la solicitud al grupo del usuario', this.requestToProyecto.idUsuario, 'en el poyecto', this.project.idProyecto);
            this.solicitudEnviada = true;
            this.tipo = 'Solicitud cancelada';
            /* this.spinner.hide(); */
          },
          err => {
            this.sendEmail = false;
            console.log(err);
            /* this.spinner.show(); */
          });

        setTimeout(() => {
            this.messageEvent.emit(true);
          }, 2000);

        this.email = {
            projectId: project.idProyecto,
            userId: this.activatedRoute.snapshot.params.idUsuario,
            tipo: 'SolicitudNueva',
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

        break;
      }
      case 'Solicitudes enviadas': {

        this.service.deleteRequestUsuario(project.idProyecto, this.requestToProyecto.idUsuario).subscribe(
          (data: any) => {
            console.log( 'eliminando solicitud del usuario', this.requestToProyecto.idUsuario, 'en el proyecto:', project.idProyecto);
            this.tipo = 'Eliminar cancelada';
          }
        );
        setTimeout(() => {
          this.messageEvent.emit(true);
        }, 2000);

        break;
      }
      case 'Solicitud cancelada': {

        this.service.deleteRequestUsuario(project.idProyecto, this.requestToProyecto.idUsuario).subscribe(
          (data: any) => {
            console.log( 'eliminando solicitud del usuario', this.requestToProyecto.idUsuario, 'en el proyecto:', project.idProyecto);
            this.tipo = 'Todos los proyectos';
          }
        );
        setTimeout(() => {
          this.messageEvent.emit(true);
        }, 2000);

        break;
      }

      default: {
        break;
      }
   }



  }


  getUserType(idProject: number) {
    const idUsuario = this.activatedRoute.snapshot.params.idUsuario;
    this.service.searchUserType(idProject, idUsuario).subscribe(
      (data: any) => {
        this.userViewProject = data[0].isAdmin;
        console.log( data[0].isAdmin, 'acaaaaaaaaaaaaaaa');
        /* this.userView = this.userTypeProject.isAdmin;
        console.log(this.userTypeProject); */
      }
    );
  }

}


