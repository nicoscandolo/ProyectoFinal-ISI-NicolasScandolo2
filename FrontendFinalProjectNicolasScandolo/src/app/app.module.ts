import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ProjectsListComponent } from './Components/projects-list/projects-list.component';
import { ProjectDetailsComponent } from './Components/project-details/project-details.component';
import { ProjectService } from './Services/project.service';
import { ProjectAddComponent } from './Components/project-add/project-add.component';
import { Form, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './Components/project/project.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { UploadComponent } from './Components/upload/upload.component';
import { DownloadComponent } from './Components/download/download.component';
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
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
   /*  NgxSpinnerService */
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
