import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  idUsuario: any;
  tipoU: any;

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              private service: ProjectService) {
                this.idUsuario =  this.activatedRoute.snapshot.params.idUsuario;
                this.tipoU = this.activatedRoute.snapshot.params.tipoUsuario;
               }

  ngOnInit() {
  }


  perfil() {
    console.log(this.idUsuario, this.tipoU, 'esta bien');
    this.route.navigate(['landingpage', 2, true , 'perfil']);
  }

}
