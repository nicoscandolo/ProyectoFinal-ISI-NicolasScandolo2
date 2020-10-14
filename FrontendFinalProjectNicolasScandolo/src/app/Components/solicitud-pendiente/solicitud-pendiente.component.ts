import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestToProyecto } from 'src/app/Models/request-to-proyecto.model';
import { UsuarioProyecto } from 'src/app/Models/usuario-proyecto.model';
import { Usuario } from 'src/app/Models/usuario.model';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-solicitud-pendiente',
  templateUrl: './solicitud-pendiente.component.html',
  styleUrls: ['./solicitud-pendiente.component.css']
})
export class SolicitudPendienteComponent implements OnInit {
  @Input() solicitudes: any;
  @Output() messageEvent = new EventEmitter<boolean>();
  private usuario: Usuario;
  errorMessage: any;
  private usuarioProyecto: UsuarioProyecto;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ProjectService) {

     }

  ngOnInit() {
    this.buscarUsuario();
  }

  buscarUsuario() {

    this.service.searchUsuario(this.solicitudes.idUsuario).subscribe(
      (response: any) => {
       /*  console.log(response);
        console.log(response.data); */
        this.usuario = response;
        console.log(this.usuario);
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

  aceptar() {

    this.usuarioProyecto = {
      idProjecto : this.solicitudes.idProyecto,
      idUsuario : this.solicitudes.idUsuario,
      isAdmin : false,
    };

    this.service.postUsuariosProjecto(this.usuarioProyecto).subscribe(
      (data: any) => {
        console.log( 'registrando al usuario en proyecto', this.usuarioProyecto.idProjecto);
      }
    );



    setTimeout(() => {
      this.messageEvent.emit(true);
    }, 2000);

  }

  rechazar() {

    this.service.deleteRequestUsuario(this.solicitudes.idProyecto, this.solicitudes.idUsuario).subscribe(
      (data: any) => {
        console.log( 'eliminando solicitud', this.solicitudes.idUsuario);
      }
    );



    setTimeout(() => {
      this.messageEvent.emit(true);
    }, 2000);
  }

}
