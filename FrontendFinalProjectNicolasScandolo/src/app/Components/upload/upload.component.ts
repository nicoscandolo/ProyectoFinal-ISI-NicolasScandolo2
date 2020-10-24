import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { Route } from '@angular/compiler/src/core';
import { HttpEventType, HttpClient  } from '@angular/common/http';
import { ProgressStatus, ProgressStatusEnum } from 'src/app/models/progress-status.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Email } from 'src/app/Models/email.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
 public progress: number;
 public message: string;
 public email: Email;
 public sendEmail: boolean;

 @Output() public uploadStatus: EventEmitter<ProgressStatus>;
 @Input() public disabled: boolean;
 @ViewChild('inputFile') inputFile: ElementRef;

 constructor(private service: ProjectService,
             private http: HttpClient,
             private router: Router,
             private activatedRoute: ActivatedRoute
  ) {
              this.uploadStatus = new EventEmitter<ProgressStatus>();
             }

 ngOnInit() {
 }


public upload(event) {
  this.sendEmail = true;
  const id = this.activatedRoute.snapshot.params.query;
  const idCarp = this.activatedRoute.snapshot.params.carpeta;
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    this.uploadStatus.emit({status: ProgressStatusEnum.START});
    this.service.postFile(file, id, idCarp).subscribe(
      data => {
        if (data) {
          switch (data.type) {
            case HttpEventType.UploadProgress:
              this.uploadStatus.emit( {status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100)});
              break;
            case HttpEventType.Response:
              this.inputFile.nativeElement.value = '';
              this.uploadStatus.emit( {status: ProgressStatusEnum.COMPLETE});
              break;
          }
          this.email = {
            projectId: id,
            userId: this.activatedRoute.snapshot.params.idUsuario,
            tipo: 'upload',
          };
        }
      },
      error => {
        this.sendEmail = false;
        this.inputFile.nativeElement.value = '';
        this.uploadStatus.emit({status: ProgressStatusEnum.ERROR});
      }
    );
  }
  if (this.sendEmail) {
    this.service.sendEmail(this.email).subscribe(
    ( res: any ) => {
      console.log(res, 'se mando bien el mail');
    },
    err => {
      console.log(err, 'No pude enviar el mail');
      if (err.status !== 0) { this.message = err.error.message; }

      if (err.status === 0) {
        this.message = 'No pude enviar el mail. Unable to connect with server';
      }

    }
  );
 }

}
}
