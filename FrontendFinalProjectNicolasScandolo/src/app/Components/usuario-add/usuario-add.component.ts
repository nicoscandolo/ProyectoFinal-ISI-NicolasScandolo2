import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carpeta } from 'src/app/Models/carpeta.model';
import { Email } from 'src/app/Models/email.model';
import { UsuarioProyecto } from 'src/app/Models/usuario-proyecto.model';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {



  // tslint:disable-next-line:variable-name
  @ViewChild('modal_1') modal_1: TemplateRef<any>;
  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;
  @Output() messageEvent = new EventEmitter<boolean>();
  backdrop: any;
  nombre = '';
  private usuarioNewInProject: UsuarioProyecto;
  sendEmail: boolean;
  email: Email;
  view: boolean;
  viewUsuarios: boolean;

  private UsuariosList: any = [];
  private UsuariosListSearch: any = [];
  private UsuariosFiltered: any = [];
  errorMessage: any;
  nameToSearch: string;
  Admin: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ProjectService,
    private router: Router,
    private http: HttpClient) {

      this.Admin = false;
      this.view = this.activatedRoute.snapshot.params.tipoUsuario;
      this.viewUsuarios = false;

      this.nombre = '';
      this.nameToSearch = '';

      this.usuarioNewInProject = {
        idUsuario: 1000,
        idProjecto: this.activatedRoute.snapshot.params.query,
        isAdmin: false,
      };
     }

     ngOnInit() {
      this.searchUsuariosList();
     }

  showDialog() {
      // tslint:disable-next-line:prefer-const
      let view = this.modal_1.createEmbeddedView(null);
      this.vc.insert(view);
      this.modal_1.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
      this.modal_1.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
      this.modal_1.elementRef.nativeElement.previousElementSibling.style.display = 'block';
      this.backdrop = document.createElement('DIV');
      this.backdrop.style = 'opacity:0.6 !important';
      this.backdrop.className = 'modal-backdrop';
      document.body.appendChild(this.backdrop);
  }

  closeDialog() {
    this.nameToSearch = '';
    this.vc.clear();
    document.body.removeChild(this.backdrop);
  }

  agregarUsuario() {
    this.sendEmail = true;
    console.log(this.usuarioNewInProject, 'usuario antes de enviar');
    console.log(this.nameToSearch);
    const usuarioFound = this.UsuariosListSearch.filter(x => x.nombre === this.nameToSearch);
    console.log('este es el usuario que encontre', usuarioFound);
    this.usuarioNewInProject.idUsuario = usuarioFound[0].idUsuario;
    this.usuarioNewInProject.isAdmin = this.Admin;
    console.log(this.usuarioNewInProject, 'usuario antes de enviar');
    // el nombre que se seleccione en el box(NametoSearch) despues lo tengo que hacer macehar
    // con la list de usuario y obtener el id, ese es el que le asigno al id de usuario
      // devuelve un observable por eso le pongo el .susbscribe ya que me va a devolver el observable como exito o error
    this.service.postUsuariosProjecto(this.usuarioNewInProject).subscribe(
    res => {
      console.log(res);
      console.log('el usuario se agrego correctamente');
    },
    err => {
      console.log(err, 'el usuario NO se agrego correctamente');
      /* this.spinner.show(); */
    }
  );


    this.nameToSearch = '';
    this.Admin = false;
    this.vc.clear();
    document.body.removeChild(this.backdrop);

    setTimeout(() => {
      console.log('waiting');
      this.messageEvent.emit(true);
    }, 1500);



    this.email = {
      projectId: this.usuarioNewInProject.idProjecto,
      userId: this.usuarioNewInProject.idUsuario,
      tipo: 'welcomeGroup'
    };

    if (this.sendEmail) {

      setTimeout(() => {
        console.log('waiting');
        this.service.sendEmail(this.email).subscribe(
          ( res: any ) => {
            console.log(res, 'esperando a que se mande bien el mail');
          },
          err => {
            console.log(err, 'No pude enviar el mail');

          }
        );
      }, 5000);

   }
  }


  // Get usuarios para buscarlos y agregarlos
  searchUsuariosList(): void {
    this.service.searchUsuarios().subscribe(
      (response: any) => {
        console.log(response, 'me trajo los usuarios');
        this.UsuariosList = response;
        this.UsuariosListSearch = response;
        console.log(this.UsuariosList);
      },
      err => {
        console.log(err, 'no me trajo los usuarios');
        if (err.status !== 0) { this.errorMessage = err.error.message; }
        if (err.status === 0) {
          this.errorMessage = 'Unable to connect with server';
        }
      }
    );
    }


  searchUsuario(nameToSearch) {
      this.viewUsuarios = false;
      if (nameToSearch === '') {
        this.viewUsuarios = false;
        this.UsuariosListSearch = this.UsuariosList;
        // this.AllProjectsListSearch = this.AllProjectsList;
      } else {
              this.viewUsuarios = true;
              // tslint:disable-next-line:only-arrow-functions
              this.UsuariosFiltered = this.UsuariosListSearch.filter(function(Usuario) {
                // tslint:disable-next-line:no-unused-expression
                Usuario.name;
                return (
                  Usuario.nombre.toLowerCase().indexOf(nameToSearch.toLowerCase()) !== -1
                );
              });
              this.UsuariosListSearch = this.UsuariosFiltered;


      }
    }


}
