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

  constructor(
    private route: ActivatedRoute,
    private service: ProjectService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    console.log(this.consulta);
  }

}
