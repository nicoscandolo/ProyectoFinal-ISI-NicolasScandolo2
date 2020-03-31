import { Injectable } from '@angular/core';
import { Project } from '../Models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  formData: Project;

  constructor() { }
}
