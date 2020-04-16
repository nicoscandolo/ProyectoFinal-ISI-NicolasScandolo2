import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {

  projectoAdd: FormGroup;
  submitted = false;
  titulo = 'Add new project';
  constructor() { }

  ngOnInit() {
/*     this.projectoAdd = this.FormBuilder.FormGroup.group({
      nya: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      postre: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(6)]], */


/*       this.projectoAdd = new FormGroup({
        name: new FormControl(this.newMovie.name, Validators.required),
        genre: new FormControl(this.newMovie.genre, Validators.required),
        year: new FormControl(this.newMovie.year, Validators.required),
        releaseDate: new FormControl(this.newMovie.release_date),
        poster: new FormControl(this.newMovie.img_path, Validators.required)
      });

  }); */
  }

}
