import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project: any;
  @Input() tipo: any;
userViewProject: any;

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              private service: ProjectService) {
               }

  ngOnInit() {
  }

  goToDetails(project: any) {
    if (this.tipo === 'Mis proyectos') {
    this.getUserType( project.idProyecto);
    console.log( project.idProyecto);
    console.log(this.userViewProject, 'a ver que onda el userrr');
    const idUsuario = this.activatedRoute.snapshot.params.idUsuario;
    const tipoU = this.activatedRoute.snapshot.params.tipoUsuario;

    console.log('waiting go to project', this.userViewProject );
    setTimeout(() => {
      this.route.navigate(['landingpage', idUsuario, tipoU, 'project-details', project.idProyecto, this.userViewProject, 0]);
    }, 500);
  }
  else {

  }



  }

  getUserType(idProject: number) {
    const idUsuario = this.activatedRoute.snapshot.params.idUsuario;
    this.service.searchUserType(idProject, idUsuario).subscribe(
      (data: any) => {
        this.userViewProject = data[0].isAdmin;
        console.log( data[0].isAdmin, 'acaaaaaaaaaaaaaaa');
        /* this.userView = this.userTypeProject.isAdmin;
        console.log(this.userTypeProject); */
      }
    );
  }

}


