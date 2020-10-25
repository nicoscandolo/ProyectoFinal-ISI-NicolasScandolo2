import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-solicitudes-pendientes',
  templateUrl: './solicitudes-pendientes.component.html',
  styleUrls: ['./solicitudes-pendientes.component.css']
})
export class SolicitudesPendientesComponent implements OnInit {
  errorMessage: string;
  private solicitudesList: any = [];
  private UsuariosList: any = [];
  messageFromSolicitud: any;
  ActualDropDown: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ProjectService) {
      this.ActualDropDown = 'Usuarios';
     }

  ngOnInit() {
    const idProyecto = this.activatedRoute.snapshot.params.query;
    this.getSolicitudes(idProyecto);
    this.GetUsers(idProyecto);

  }

  getSolicitudes(idProyecto) {
    this.service.searchSolicitudesList(idProyecto).subscribe(
      (response: any) => {
       /*  console.log(response);
        console.log(response.data); */
        const testt = response;
       /*  console.log(testt); */
        this.solicitudesList = testt;
        console.log(this.solicitudesList);
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

  receiveMessage($event) {
    console.log('entro en el otro componente', $event);
    this.messageFromSolicitud = $event;
    const idProyecto = this.activatedRoute.snapshot.params.query;

    if (this.messageFromSolicitud) {
      setTimeout(() => {
      console.log('waiting');
      this.getSolicitudes(idProyecto);
      this.GetUsers(idProyecto);
    }, 2000);
      console.log('se ejecuto'); }
  }


  Mostrar(Actual) {
    this.ActualDropDown = Actual;
  }




  GetUsers(idProyecto) {

        this.service.GetUsersOfProjects(idProyecto).subscribe(
          (response: any) => {
            this.UsuariosList = response;
            console.log(this.UsuariosList);
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
