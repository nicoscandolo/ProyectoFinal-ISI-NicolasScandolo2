import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Componentes a direccionar
import { ProjectComponent } from '../Components/project/project.component';
import { ProjectAddComponent } from '../Components/project-add/project-add.component';
import { ProjectDetailsComponent } from '../Components/project-details/project-details.component';
import { AppComponent } from '../app.component';
import { NavbarComponent } from '../Components/navbar/navbar.component';
import { ProjectsListComponent } from '../Components/projects-list/projects-list.component';
import { SignInComponent } from '../Components/sign-in/sign-in.component';
import { SignUpComponent } from '../Components/sign-up/sign-up.component';

// Guard
import { AuthGuard } from '../auth.guard';
import { ConsultasListComponent } from '../Components/consultas-list/consultas-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'landingpage', pathMatch: 'full' },
  {
    path: 'landingpage',
    component: ProjectsListComponent,
  },
  {
    path: 'project',
    component: ProjectDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projectList',
    component: ProjectsListComponent,
    canActivate: [AuthGuard]
  },

   {
    path: 'project-details/:query/consultas',
    component: ConsultasListComponent,
  },
  {
    path: 'project-details/:query',
    component: ProjectDetailsComponent,
  },
  {
     path: 'signin',
     component: SignInComponent
  },
  {
     path: 'signup',
     component: SignUpComponent
  }
/*   {
    path: "addmovie",
    component: AddMovieComponent,
    canActivate: [AuthGuard]
  } */
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
