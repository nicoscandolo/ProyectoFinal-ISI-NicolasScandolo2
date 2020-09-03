import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comentario-consulta',
  templateUrl: './comentario-consulta.component.html',
  styleUrls: ['./comentario-consulta.component.css']
})
export class ComentarioConsultaComponent implements OnInit {
@Input() comentario: any;

  constructor() { }

  ngOnInit() {
  }

}
