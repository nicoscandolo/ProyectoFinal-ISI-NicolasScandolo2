import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  private ProjectsList: any = [];
  private errorMessage: string;

  constructor(private service: ProjectService) { }

  ngOnInit() {
    this.searchProjectsList();
  }

  searchProjectsList(): void {
    this.service.searchProjectsList().subscribe(
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
  }
}

