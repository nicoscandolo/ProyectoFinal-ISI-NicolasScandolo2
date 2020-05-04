import { Injectable } from '@angular/core';
import { Project } from '../Models/project.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  formData: Project;
  readonly rootURL = 'http://localhost:52116/api/';
  constructor(private http: HttpClient) { }


  postProject(formData: Project) {
   return this.http.post(this.rootURL + 'Proyecto', formData);
  }
}
