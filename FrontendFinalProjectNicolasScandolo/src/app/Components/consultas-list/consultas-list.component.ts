import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consultas-list',
  templateUrl: './consultas-list.component.html',
  styleUrls: ['./consultas-list.component.css']
})
export class ConsultasListComponent implements OnInit {
  private consultasList: any = [];
  private errorMessage: string;

    constructor(
      private activatedRoute: ActivatedRoute,
      private service: ProjectService,
      private router: Router,
      private http: HttpClient) { }

  ngOnInit() {
    const idProyecto = this.activatedRoute.snapshot.params.query;
    this.searchConsultasList(idProyecto);
  }

  searchConsultasList(id: number): void {
    this.service.searchConsultasList(id).subscribe(
      (response: any) => {
        const testt = response;
        this.consultasList = testt;
        console.log(this.consultasList);
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
