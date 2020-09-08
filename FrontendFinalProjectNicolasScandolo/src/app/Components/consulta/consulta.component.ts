import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  @Input() consulta: any;
  private comentariosList: any = [];
  private errorMessage: string;
  private show: boolean;

  constructor(
    private route: ActivatedRoute,
    private service: ProjectService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.show = false;
    console.log(this.consulta);
  }

  ShowComents(id: number): void {
    this.service.searchComentariossList(id).subscribe(
      (response: any) => {
        const testt = response;
        this.comentariosList = testt;
        console.log(this.comentariosList);
      },
      err => {
        console.log(err);
        if (err.Status !== 0) { this.errorMessage = err.error.message; } else {
          this.errorMessage = 'Unable to connect with server';
        }
      }
    );
  }
}
