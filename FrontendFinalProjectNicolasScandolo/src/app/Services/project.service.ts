import { Injectable } from '@angular/core';
import { Project } from '../Models/project.model';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documento } from '../Models/documento.model';
import { Router } from '@angular/router';
import { Consulta } from '../Models/consulta.model';
import { ComentarioConsulta } from '../Models/comentario-consulta.model';
import { Email } from '../Models/email.model';
import { Carpeta } from '../Models/carpeta.model';
import { UsuarioProyecto } from '../Models/usuario-proyecto.model';
import { RequestToProyecto } from '../Models/request-to-proyecto.model';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  formData: Project;
  readonly rootURL = 'http://localhost:5000/api/';
  constructor(private http: HttpClient, private router: Router) { }


  postProject(formData: Project, idUsuario: number) {
   return this.http.post(this.rootURL + 'Proyecto/' + idUsuario , formData);
  }

  postComentarioConsulta(comentarioConsulta: ComentarioConsulta) {
    return this.http.post(this.rootURL + 'ComentarioConsulta/', comentarioConsulta);
  }
  Incremento(consulta: Consulta, increment: number) {
    return this.http.put(this.rootURL + 'Consulta/' + consulta.idConsulta + '/' + increment, consulta);
  }

  postConsulta( consulta: Consulta) {
    return this.http.post(this.rootURL + 'Consulta/', consulta);
  }

  postCarpeta( carpeta: Carpeta) {
    return this.http.post(this.rootURL + 'Carpeta/', carpeta);
  }

  postUsuariosProjecto( usuarioProyecto: UsuarioProyecto) {
    return this.http.post(this.rootURL + 'UsuariosProjecto/', usuarioProyecto);
  }

  deleteConsulta(idConsulta) {
    return this.http.delete(this.rootURL + 'Consulta/' + idConsulta);
  }

  deleteRequestUsuario(idProyecto, idUsuario) {
    return this.http.delete(this.rootURL + 'requesttoproyecto/' + idProyecto + '/' + idUsuario);
  }

  postRequestToProyecto(requestToProyecto: RequestToProyecto) {
    return this.http.post(this.rootURL + 'requesttoproyecto/', requestToProyecto);
  }

  searchProject(idProject: number) {
    return this.http.get(this.rootURL + 'Proyecto/' + idProject);
  }

  searchSolicitudesList(idProyecto) {
    return this.http.get(this.rootURL + 'requesttoproyecto/' + idProyecto);
  }

  searchUsuario(idUsuario) {
    return this.http.get(this.rootURL + 'usuario/' + idUsuario);
  }

  searchUsuarios() {
    return this.http.get(this.rootURL + 'Usuario');
  }

  searchUserType(idProyecto, idUsuario) {
    return this.http.get(this.rootURL + 'UsuariosProjecto/' + idProyecto + '/' + idUsuario);
  }

  searchProjectsList(id) {
    return this.http.get(this.rootURL + 'UsuariosProjecto/' + id);
  }

  GetUsersOfProjects(idProyecto) {
    return this.http.get(this.rootURL + 'UsuariosProjecto/users/' + idProyecto);
  }

  searchRequestsUsuario(idUsuario) {
    return this.http.get(this.rootURL + 'requesttoproyecto/missolicitudes/' + idUsuario);

  }


  searchAllProjectsList(idUsuario) {
    return this.http.get(this.rootURL + 'Proyecto/todos/' + idUsuario );
  }

  searchAllProjectsAdminList() {
    return this.http.get(this.rootURL + 'Proyecto' );
  }

  searchFilesList(idProj, idCarp) {
    return this.http.get(this.rootURL + 'Documento/' + idProj + '/' + idCarp);
  }

  searchCarpetasList(idProj, idCarp) {
    return this.http.get(this.rootURL + 'Carpeta/' + idProj + '/' + idCarp);
  }

  searchConsultasList(id) {
    return this.http.get(this.rootURL + 'Consulta/' + id);
  }

  searchComentariossList(id) {
    return this.http.get(this.rootURL + 'ComentarioConsulta/' + id);
  }

  postFile(fileToUpload: File, id, idCarp) {

    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post(this.rootURL + 'Documento/upload/' + id + '/' + idCarp, formData, {reportProgress: true, observe: 'events'});
}

sendEmail(email: Email) {
  return this.http.post(this.rootURL + 'mail/send', email);
}

public downloadFile(id: number): Observable<HttpEvent<Blob>> {

  return this.http.request(new HttpRequest(
    'GET',
    this.rootURL + 'Documento/Download/' + id,
    null,
    {
      reportProgress: true,
      responseType: 'blob'
    }));
  }
}
