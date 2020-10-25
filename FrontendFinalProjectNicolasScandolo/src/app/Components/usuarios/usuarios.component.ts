import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  @Input() usuarios: any;
  @Output() messageEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
