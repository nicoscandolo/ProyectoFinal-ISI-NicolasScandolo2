import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
ActualUser: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ProjectService) { }

  ngOnInit() {
    const idUsuario = this.activatedRoute.snapshot.params.idUsuario;
    this.getUsuario(idUsuario);
  }

  getUsuario(id) {
    this.service.searchUsuario(id).subscribe(
      (response: any) => {
        this.ActualUser = response.nombre;
      },
      err => {
        console.log(err);

      }
    );
  }

}
