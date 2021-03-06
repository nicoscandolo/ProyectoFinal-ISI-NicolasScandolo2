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
import { ConsultaAddComponent } from '../Components/consulta-add/consulta-add.component';
import { SolicitudesPendientesComponent } from '../Components/solicitudes-pendientes/solicitudes-pendientes.component';
import { UserProfileComponent } from '../Components/user-profile/user-profile.component';
import { LandingPageComponent } from '../Components/landing-page/landing-page.component';
import { PageErrorComponent } from '../Components/page-error/page-error.component';


const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  {
    path: 'landingpage/20/:tipoUsuario',
    redirectTo: 'forbbiden',  pathMatch: 'full'
  },
  {
    path: 'landingpage/20/:tipoUsuario/project-details/:query/:viewUser/:carpeta/solicitudes',
    redirectTo: 'forbbiden',  pathMatch: 'full'
  },
  {
    path: 'landingpage/20/:tipoUsuario/project-details/:query/:viewUser/consultas',
    redirectTo: 'forbbiden',  pathMatch: 'full'
  },
  {
    path: 'landingpage/20/:tipoUsuario/project-details/:query/:viewUser/:carpeta',
    redirectTo: 'forbbiden',  pathMatch: 'full'
  },

  {
    path: 'forbbiden',
    component: PageErrorComponent,
  },

  {
    path: 'landingpage',
    component: LandingPageComponent,
  },
  {
    path: 'landingpage/:idUsuario/:tipoUsuario',
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
    path: 'landingpage/:idUsuario/:tipoUsuario/project-details/:query/:viewUser/:carpeta/solicitudes',
    component: SolicitudesPendientesComponent,
  },
   {
    path: 'landingpage/:idUsuario/:tipoUsuario/project-details/:query/:viewUser/consultas',
    component: ConsultasListComponent,
  },
  {
    path: 'landingpage/:idUsuario/:tipoUsuario/project-details/:query/:viewUser/:carpeta',
    component: ProjectDetailsComponent,
  },
  {
    path: 'landingpage/:idUsuario/:tipoUsuario/create-project',
    component: ProjectAddComponent,
  },
  {
     path: 'signin',
     component: SignInComponent
  },
  {
     path: 'signup',
     component: SignUpComponent
  },
  {
    path: 'modal',
    component: ConsultaAddComponent
 },
 {
  path: 'landingpage/:idUsuario/:tipoUsuario/perfil',
  component: UserProfileComponent
},
{
  path: 'landingpage/:idUsuario/:tipoUsuario/perfil',
  component: NavbarComponent
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
