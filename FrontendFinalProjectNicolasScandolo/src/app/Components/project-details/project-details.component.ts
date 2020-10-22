import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { Route } from '@angular/compiler/src/core';
import { HttpEventType, HttpClient  } from '@angular/common/http';
import { ProgressStatusEnum, ProgressStatus } from 'src/app/models/progress-status.model';
import { Documento } from 'src/app/models/documento.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/Models/project.model';
import { Carpeta } from 'src/app/Models/carpeta.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  public files: Documento;
  public carpetas: Carpeta;
  public carpeta: Carpeta;
  public proyecto: Project;
  public fileInDownload: string;
  public percentage: number;
  public showProgress: boolean;
  public showDownloadError: boolean;
  public showUploadError: boolean;
  messageFromAddCarpeta: boolean;
  public view: any;
  public userTypeProject: any;
  public userView: any;

  constructor(private service: ProjectService,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private route: Router
              ) {
                this.view = this.activatedRoute.snapshot.params.tipoUsuario;
                this.userView = this.activatedRoute.snapshot.params.viewUser;
              }

  ngOnInit() {
    this.getProyectoId();
    this.getFiles();
  }



  getProyectoId() {
    const id = this.activatedRoute.snapshot.params.query;
    this.service.searchProject(id).subscribe(
      (data: Project) => {
        this.proyecto = data;
        console.log(this.proyecto);
      }
    );
  }

  private getFiles() {
    const id = this.activatedRoute.snapshot.params.query;
    const carpId = this.activatedRoute.snapshot.params.carpeta;
    this.service.searchFilesList(id, carpId).subscribe(
      (data: Documento) => {
        this.files = data;
        console.log(this.files);
      }
    );
    this.service.searchCarpetasList(id, carpId).subscribe(
      (data: Carpeta) => {
        this.carpetas = data;
        console.log(this.carpetas);
      }
    );
  }

  goToDetailsCarpeta(carpeta: Carpeta) {
    const idProyecto = this.activatedRoute.snapshot.params.query;
    const idUsuario = this.activatedRoute.snapshot.params.idUsuario;
    const tipoU = this.activatedRoute.snapshot.params.tipoUsuario;
    const viewUser = this.activatedRoute.snapshot.params.viewUser;
    this.route.navigate(['landingpage', idUsuario, tipoU, 'project-details', idProyecto, viewUser, carpeta.idCarpeta]);
    setTimeout(() => {
      console.log('waiting to enter to folder');
      this.getFiles();
    }, 500);
  }



  goToConsultas() {
    const idProyecto = this.activatedRoute.snapshot.params.query;
    const idUsuario = this.activatedRoute.snapshot.params.idUsuario;
    const tipoU = this.activatedRoute.snapshot.params.tipoUsuario;
    const viewUser = this.activatedRoute.snapshot.params.viewUser;
    this.route.navigate(['landingpage', idUsuario, tipoU, 'project-details', idProyecto, viewUser, 'consultas']);
  }

  goToSolicitudes() {
    const idProyecto = this.activatedRoute.snapshot.params.query;
    const idUsuario = this.activatedRoute.snapshot.params.idUsuario;
    const tipoU = this.activatedRoute.snapshot.params.tipoUsuario;
    const viewUser = this.activatedRoute.snapshot.params.viewUser;
    const carpet = this.activatedRoute.snapshot.params.carpeta;
    this.route.navigate(['landingpage', idUsuario, tipoU, 'project-details', idProyecto, viewUser, carpet, 'solicitudes']);
  }


  public downloadStatus(event: ProgressStatus) {
    switch (event.status) {
      case ProgressStatusEnum.START:
        this.showDownloadError = false;
        break;
      case ProgressStatusEnum.IN_PROGRESS:
        this.showProgress = true;
        this.percentage = event.percentage;
        break;
      case ProgressStatusEnum.COMPLETE:
        this.showProgress = false;
        break;
      case ProgressStatusEnum.ERROR:
        this.showProgress = false;
        this.showDownloadError = true;
        break;
    }
  }

  public uploadStatus(event: ProgressStatus) {
    switch (event.status) {
      case ProgressStatusEnum.START:
        this.showUploadError = false;
        break;
      case ProgressStatusEnum.IN_PROGRESS:
        this.showProgress = true;
        this.percentage = event.percentage;
        break;
      case ProgressStatusEnum.COMPLETE:
        this.showProgress = false;
        this.getFiles();
        break;
      case ProgressStatusEnum.ERROR:
        this.showProgress = false;
        this.showUploadError = true;
        break;
    }
    setTimeout(() => {
      console.log('waiting');
      this.getFiles();
    }, 2000);
  }



  receiveMessage($event) {
    console.log('entro en el otro componente(from AddCarpetas to ProjectDetails', $event);
    this.messageFromAddCarpeta = $event;
    const idProyecto = this.activatedRoute.snapshot.params.query;

    if (this.messageFromAddCarpeta) {
      setTimeout(() => {
      console.log('waiting');
      this.getFiles();
    }, 2500);
      console.log('se ejecuto'); }
  }

}
