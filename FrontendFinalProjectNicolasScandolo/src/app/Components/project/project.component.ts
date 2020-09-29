import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project: any;
  constructor(private route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  goToDetails(project: any) {
    console.log(project.id);
    const idUsuario = this.activatedRoute.snapshot.params.idUsuario;
    this.route.navigate(['landingpage', idUsuario, 'project-details', project.idProyecto, 0]);
  }
}


