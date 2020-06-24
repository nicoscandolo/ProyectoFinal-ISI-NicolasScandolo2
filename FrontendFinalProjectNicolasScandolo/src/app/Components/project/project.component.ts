import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project: any;

  constructor() { }

  ngOnInit() {
  }

  goToDetails(movie: any) {
    // console.log(movie._id);
    // this.route.navigate(["movie-details", movie._id]);
  }
}
