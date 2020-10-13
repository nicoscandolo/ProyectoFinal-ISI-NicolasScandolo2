import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestToProyecto } from 'src/app/Models/request-to-proyecto.model';
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


    this.messageEvent.emit(true);



  }

  rechazar() {


    this.messageEvent.emit(true);
  }

}
