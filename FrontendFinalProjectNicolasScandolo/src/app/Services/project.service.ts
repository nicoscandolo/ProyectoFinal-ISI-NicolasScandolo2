import { Injectable } from '@angular/core';
import { Project } from '../Models/project.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documento } from '../Models/documento.model';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  formData: Project;
  readonly rootURL = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) { }


  postProject(formData: Project) {
   return this.http.post(this.rootURL + 'Proyecto', formData);
  }

  searchProjectsList() {
    return this.http.get(this.rootURL + 'Proyecto');
  }

  postFile(fileToUpload: File) {

    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);


    return this.http.post(this.rootURL + 'Documento/upload', formData, {reportProgress: true, observe: 'events'});
}

postFile2(fileToUpload) {
  const documento: Documento = new Documento();
  documento.Descripcion =  fileToUpload;
  return this.http.post(this.rootURL + 'Documento', documento);
}

/* postFile2(fileToUpload: File): Observable<boolean> {

  const formData: FormData = new FormData();
  formData.append('fileKey', fileToUpload, fileToUpload.name);
  const headerss: Headers = new Headers();
  headerss.append('Content-Type', 'multipart/form-data');
  return this.httpClient
    .post(this.rootURL + 'Documento', formData, { headers: headerss })
    .map(() => true)
    .catch((e) => this.handleError(e));
}
  handleError(e: any) {
    throw new Error("Method not implemented.");
  } */


}
