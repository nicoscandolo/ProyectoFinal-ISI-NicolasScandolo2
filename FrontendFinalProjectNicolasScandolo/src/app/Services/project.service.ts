import { Injectable } from '@angular/core';
import { Project } from '../Models/project.model';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documento } from '../Models/documento.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  formData: Project;
  readonly rootURL = 'http://localhost:5000/api/';
  constructor(private http: HttpClient, private router: Router) { }


  postProject(formData: Project) {
   return this.http.post(this.rootURL + 'Proyecto', formData);
  }

  searchProjectsList(id) {
    return this.http.get(this.rootURL + 'UsuariosProjecto/' + id);
  }

  searchFilesList(id) {
    return this.http.get(this.rootURL + 'Documento/' + id);
  }

  searchConsultasList(id) {
    return this.http.get(this.rootURL + 'Consulta/' + id);
  }

  searchComentariossList(id) {
    return this.http.get(this.rootURL + 'ComentarioConsulta/' + id);
  }

  postFile(fileToUpload: File, id) {

    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post(this.rootURL + 'Documento/upload/' + id, formData, {reportProgress: true, observe: 'events'});
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
