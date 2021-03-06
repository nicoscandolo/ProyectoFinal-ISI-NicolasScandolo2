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
  private AllProjectsAdminList: any = [];
  private AllProjectsAdminListSearch: any = [];
  private ProjectsFiltered: any = [];

  private errorMessage: string;
  private ActualDropDown: string;
  private MisProyectos: string;
  private TodosLosProyectos: string;
  SolicitudesEnviadas: string;
  myArray: any;
  SolicitudesProyectos: any = [];
  SolicitudesProyectosSearch: any = [];
  messageFromProject: any;
  ActualUser: string;
  AccesoAdmin: string;
  tipoUsu: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ProjectService) {
      this.ActualDropDown = 'Mis proyectos';
      this.MisProyectos = 'Mis proyectos';
      this.TodosLosProyectos = 'Todos los proyectos';
      this.SolicitudesEnviadas = 'Solicitudes enviadas';
      this.AccesoAdmin = 'Acceso admin';
     }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.idUsuario;
    this.tipoUsu = this.activatedRoute.snapshot.params.tipoUsuario;
    this.getUsuario(id);
    this.searchProjectsList(id);
  }

  getUsuario(id) {
    this.service.searchUsuario(id).subscribe(
      (response: any) => {
        this.ActualUser = response.nombre;
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

    this.service.searchAllProjectsList(id).subscribe(
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

    this.service.searchRequestsUsuario(id).subscribe(
      (response: any) => {
        this.SolicitudesProyectos = response;
        this.SolicitudesProyectosSearch = response;

       /*  console.log(testt); */
        console.log(this.SolicitudesProyectos);
      },
      err => {
        console.log(err);
        if (err.status !== 0) { this.errorMessage = err.error.message; }
        if (err.status === 0) {
          this.errorMessage = 'Unable to connect with server';
        }
      }
    );


    if (this.tipoUsu === 'true') {

    this.service.searchAllProjectsAdminList().subscribe(
      (response: any) => {
       /*  console.log(response);
        console.log(response.data); */
        this.AllProjectsAdminList = response;
        this.AllProjectsAdminListSearch = response;
       /*  console.log(testt); */
        console.log(this.AllProjectsAdminList);
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

  }

  goToCreateProject() {
    const idUsuario = this.activatedRoute.snapshot.params.idUsuario;
    const tipoU = this.activatedRoute.snapshot.params.tipoUsuario;
    this.router.navigate(['landingpage', idUsuario, tipoU, 'create-project']);
  }

  UpdateProyectosList(Option) {
    switch (Option) {
      case 'Mis proyectos': {
        this.ActualDropDown = 'Mis proyectos';
        break;
      }
      case 'Todos los proyectos': {
        this.ActualDropDown = 'Todos los proyectos';
        break;
      }
      case 'Solicitudes enviadas': {
        this.ActualDropDown = 'Solicitudes enviadas';
        break;
      }
      case 'Acceso admin': {
        this.ActualDropDown = 'Acceso admin';
        break;
      }
      default: {
        this.ActualDropDown = 'Mis proyectos';
        break;
      }
   }
    console.log(Option, 'cambio');

/*     if (Option === 'Mis proyectos') {  this.ActualDropDown = 'Mis proyectos'; } else { this.ActualDropDown = 'Todos los proyectos'; }
    console.log(Option, 'cambio'); */

  }

  searchProject(nameToSearch) {

    if (nameToSearch === '') {
      this.ProjectsListSearch = this.ProjectsList;
      this.AllProjectsListSearch = this.AllProjectsList;
      this.AllProjectsAdminListSearch = this.AllProjectsAdminList;
      this.SolicitudesProyectosSearch = this.SolicitudesProyectos;

    } else {
    switch (this.ActualDropDown) {
      case 'Mis proyectos': {

        // tslint:disable-next-line:only-arrow-functions
        this.ProjectsFiltered = this.ProjectsListSearch.filter(function(Project) {
          // tslint:disable-next-line:no-unused-expression
          Project.name;
          return (
            Project.nombre.toLowerCase().indexOf(nameToSearch.toLowerCase()) !== -1
          );
        });
        this.ProjectsListSearch = this.ProjectsFiltered;


        break;
      }
      case 'Acceso admin': {

      // tslint:disable-next-line:only-arrow-functions
      this.ProjectsFiltered = this.AllProjectsAdminListSearch.filter(function(Project) {
        // tslint:disable-next-line:no-unused-expression
        Project.name;
        return (
          Project.nombre.toLowerCase().indexOf(nameToSearch.toLowerCase()) !== -1
        );
      });
      this.AllProjectsAdminListSearch = this.ProjectsFiltered;

      break;
      }
      case 'Todos los proyectos': {

        // tslint:disable-next-line:only-arrow-functions
        this.ProjectsFiltered = this.AllProjectsListSearch.filter(function(Project) {
          // tslint:disable-next-line:no-unused-expression
          Project.name;
          return (
            Project.nombre.toLowerCase().indexOf(nameToSearch.toLowerCase()) !== -1
          );
        });
        this.AllProjectsListSearch = this.ProjectsFiltered;

        break;
      }
      case 'Solicitudes enviadas': {
        // tslint:disable-next-line:only-arrow-functions
        this.ProjectsFiltered = this.SolicitudesProyectosSearch.filter(function(Project) {
          // tslint:disable-next-line:no-unused-expression
          Project.nombre;
          return (
            Project.nombre.toLowerCase().indexOf(nameToSearch.toLowerCase()) !== -1
          );
        });
        this.SolicitudesProyectosSearch = this.ProjectsFiltered;

        break;
      }
      default: {
        console.log('no entra en opciones buscar proyectos');
        break;
      }
   }
  }



  }


  receiveMessage($event) {
    console.log('entro en el otro componente', $event);
    this.messageFromProject = $event;
    const id = this.activatedRoute.snapshot.params.idUsuario;

    if (this.messageFromProject) {
      setTimeout(() => {
      console.log('waiting');
      this.searchProjectsList(id);
    }, 2000);
      console.log('se ejecuto'); }
  }
}

