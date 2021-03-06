import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ProjectsListComponent } from './Components/projects-list/projects-list.component';
import { ProjectDetailsComponent } from './Components/project-details/project-details.component';
import { ProjectService } from './Services/project.service';
import { AuthService } from './Services/auth.service';
import { ProjectAddComponent } from './Components/project-add/project-add.component';
import { Form, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './Components/project/project.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { UploadComponent } from './Components/upload/upload.component';
import { DownloadComponent } from './Components/download/download.component';
import { ConsultasListComponent } from './Components/consultas-list/consultas-list.component';
import { ConsultaComponent } from './Components/consulta/consulta.component';
import { ComentarioConsultaComponent } from './Components/comentario-consulta/comentario-consulta.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { ConsultaAddComponent } from './Components/consulta-add/consulta-add.component';
import { ModalComponent } from './Components/modal/modal.component';
import { CarpetasAddComponent } from './Components/carpetas-add/carpetas-add.component';
import { SolicitudesPendientesComponent } from './Components/solicitudes-pendientes/solicitudes-pendientes.component';
import { UsuarioAddComponent } from './Components/usuario-add/usuario-add.component';
import { SolicitudPendienteComponent } from './Components/solicitud-pendiente/solicitud-pendiente.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { PageErrorComponent } from './Components/page-error/page-error.component';
/* import { NgxSpinnerService } from 'ngx-spinner'; */



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsListComponent,
    ProjectDetailsComponent,
    ProjectAddComponent,
    ProjectComponent,
    SignInComponent,
    SignUpComponent,
    UploadComponent,
    DownloadComponent,
    ConsultasListComponent,
    ConsultaComponent,
    ComentarioConsultaComponent,
    LandingPageComponent,
    UserProfileComponent,
    ConsultaAddComponent,
    ModalComponent,
    CarpetasAddComponent,
    SolicitudesPendientesComponent,
    UsuarioAddComponent,
    SolicitudPendienteComponent,
    UsuariosComponent,
    PageErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
   /*  NgxSpinnerService */
  ],
  providers: [ProjectService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
