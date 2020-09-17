import { Component, OnInit, ElementRef, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consulta-add',
  templateUrl: './consulta-add.component.html',
  styleUrls: ['./consulta-add.component.css']
})
export class ConsultaAddComponent {

  // tslint:disable-next-line:variable-name
  @ViewChild('modal_1') modal_1: TemplateRef<any>;
  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;
  backdrop: any;
  descripcion: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ProjectService,
    private router: Router,
    private http: HttpClient) {
      this.descripcion = '';
     }

  showDialog() {
      // tslint:disable-next-line:prefer-const
      let view = this.modal_1.createEmbeddedView(null);
      this.vc.insert(view);
      this.modal_1.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
      this.modal_1.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
      this.modal_1.elementRef.nativeElement.previousElementSibling.style.display = 'block';
      this.backdrop = document.createElement('DIV');
      this.backdrop.className = 'modal-backdrop';
      document.body.appendChild(this.backdrop);
  }

  closeDialog() {
    this.descripcion = '';
    this.vc.clear();
    document.body.removeChild(this.backdrop);
  }

  publicarConsulta(descripcion: string) {
    console.log(descripcion);
    this.vc.clear();
    document.body.removeChild(this.backdrop);
  }
}
