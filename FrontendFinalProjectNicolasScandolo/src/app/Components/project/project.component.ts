import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project: any;

  constructor(private route: Router) { }

  ngOnInit() {
  }

  goToDetails(project: any) {
    console.log(project.id);
    this.route.navigate(['project-details', project.idProyecto]);
  }
}
