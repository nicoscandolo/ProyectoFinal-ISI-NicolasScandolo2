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
  private AllProjectsList: any = [];
  private errorMessage: string;
  private ActualDropDown: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ProjectService) {
      this.ActualDropDown = 'Mis proyectos';
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
}

