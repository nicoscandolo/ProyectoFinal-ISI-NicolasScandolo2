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
  private consultasListSearch: any = [];
  private errorMessage: string;
  private messageFromAddConsulta: boolean;
  private consultasFiltered: any = [];
  ActualDropDown: string;


    constructor(
      private activatedRoute: ActivatedRoute,
      private service: ProjectService,
      private router: Router,
      private http: HttpClient) {
        this.ActualDropDown = 'Mas recientes';
      }

  ngOnInit() {
    const idProyecto = this.activatedRoute.snapshot.params.query;
    this.searchConsultasList(idProyecto);
  }





  receiveMessage($event) {
    console.log('entro en el otro componente', $event);
    this.messageFromAddConsulta = $event;
    const idProyecto = this.activatedRoute.snapshot.params.query;

    if (this.messageFromAddConsulta) {
      setTimeout(() => {
      console.log('waiting');
      this.searchConsultasList(idProyecto);
    }, 2000);
      console.log('se ejecuto'); }
  }

  public searchConsultasList(id: number): void {
    this.service.searchConsultasList(id).subscribe(
      (response: any) => {
        const testt = response;
        this.consultasList = testt;
        this.consultasListSearch = testt;
        this.consultasList.sort((a, b) => b.fechaCreacion.localeCompare(a.fechaCreacion));
        this.consultasListSearch.sort((a, b) => b.fechaCreacion.localeCompare(a.fechaCreacion));
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


  searchProject(nameToSearch) {

    if (nameToSearch === '') {
      this.consultasListSearch = this.consultasList;

    } else {


        // tslint:disable-next-line:only-arrow-functions
        this.consultasFiltered = this.consultasListSearch.filter(function(Consulta) {
          // tslint:disable-next-line:no-unused-expression
          Consulta.name;
          return (
            Consulta.descripcion.toLowerCase().indexOf(nameToSearch.toLowerCase()) !== -1
          );
        });
        this.consultasListSearch = this.consultasFiltered;

      }
  }

  Ordenar(Actual) {
    this.ActualDropDown = Actual;

    switch (this.ActualDropDown) {
      case 'Mas votadas': {
        this.consultasList.sort((a, b) => b.puntuacion - a.puntuacion);
        break;
      }
      case 'Menos votadas': {
        this.consultasList.sort((a, b) => a.puntuacion - b.puntuacion);
        break;
      }
      case 'Mas antiguas': {
        this.consultasList.sort((a, b) => a.fechaCreacion.localeCompare(b.fechaCreacion));
        break;
      }
      case 'Mas recientes': {
        this.consultasList.sort((a, b) => b.fechaCreacion.localeCompare(a.fechaCreacion));
        break;
      }
      default: {
        this.ActualDropDown = 'Mas recientes';
        break;
      }
   }



  }




}

