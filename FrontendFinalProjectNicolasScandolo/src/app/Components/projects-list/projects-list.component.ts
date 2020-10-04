import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  private ProjectsList: any = [];
  private ProjectsListSearch: any = [];
  private AllProjectsList: any = [];
  private AllProjectsListSearch: any = [];
  private ProjectsFiltered: any = [];

  private errorMessage: string;
  private ActualDropDown: string;
  private MisProyectos: string;
  private TodosLosProyectos: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ProjectService) {
      this.ActualDropDown = 'Mis proyectos';
      this.MisProyectos = 'Mis proyectos';
      this.TodosLosProyectos = 'Todos los proyectos';
     }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.idUsuario;
    this.searchProjectsList(id);
  }

  searchProjectsList(id): void {
    this.service.searchProjectsList(id).subscribe(
      (response: any) => {
       /*  console.log(response);
        console.log(response.data); */
        const testt = response;
       /*  console.log(testt); */
        this.ProjectsList = testt;
        this.ProjectsListSearch = testt;
        console.log(this.ProjectsList);
      },
      err => {
        console.log(err);
        if (err.status !== 0) { this.errorMessage = err.error.message; }
        if (err.status === 0) {
          this.errorMessage = 'Unable to connect with server';
        }
      }
    );

    this.service.searchAllProjectsList().subscribe(
      (response: any) => {
       /*  console.log(response);
        console.log(response.data); */
        this.AllProjectsList = response;
        this.AllProjectsListSearch = response;
       /*  console.log(testt); */
        console.log(this.AllProjectsList);
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

  goToCreateProject() {
    const idUsuario = this.activatedRoute.snapshot.params.idUsuario;
    const tipoU = this.activatedRoute.snapshot.params.tipoUsuario;
    this.router.navigate(['landingpage', idUsuario, tipoU, 'create-project']);
  }

  UpdateProyectosList(Option) {
    if (Option === 'Mis proyectos') {  this.ActualDropDown = 'Mis proyectos'; } else { this.ActualDropDown = 'Todos los proyectos'; }
    console.log(Option, 'cambio');

  }

  searchProject(nameToSearch) {

    if (nameToSearch === '') {
      this.ProjectsListSearch = this.ProjectsList;
      this.AllProjectsListSearch = this.AllProjectsList;
    } else {
            if (this.ActualDropDown === 'Mis proyectos') {
            // tslint:disable-next-line:only-arrow-functions
            this.ProjectsFiltered = this.ProjectsListSearch.filter(function(Project) {
              // tslint:disable-next-line:no-unused-expression
              Project.name;
              return (
                Project.nombre.toLowerCase().indexOf(nameToSearch.toLowerCase()) !== -1
              );
            });
            this.ProjectsListSearch = this.ProjectsFiltered;
    } else {
            // tslint:disable-next-line:only-arrow-functions
            this.ProjectsFiltered = this.AllProjectsListSearch.filter(function(Project) {
              // tslint:disable-next-line:no-unused-expression
              Project.name;
              return (
                Project.nombre.toLowerCase().indexOf(nameToSearch.toLowerCase()) !== -1
              );
            });
            this.AllProjectsListSearch = this.ProjectsFiltered;

    }

    }
  }
}

