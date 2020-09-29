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

  postConsulta( consulta: Consulta) {
    return this.http.post(this.rootURL + 'Consulta/', consulta);
  }

  postCarpeta( carpeta: Carpeta) {
    return this.http.post(this.rootURL + 'Carpeta/', carpeta);
  }

  searchProject(idProject: number) {
    return this.http.get(this.rootURL + 'Proyecto/' + idProject);
  }

  searchProjectsList(id) {
    return this.http.get(this.rootURL + 'UsuariosProjecto/' + id);
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
