import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { Route } from '@angular/compiler/src/core';
import { HttpEventType, HttpClient  } from '@angular/common/http';
import { ProgressStatus, ProgressStatusEnum } from 'src/app/models/progress-status.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
 public progress: number;
 public message: string;

 @Output() public uploadStatus: EventEmitter<ProgressStatus>;
 @Input() public disabled: boolean;
 @ViewChild('inputFile') inputFile: ElementRef;

 constructor(private service: ProjectService, private http: HttpClient) {
              this.uploadStatus = new EventEmitter<ProgressStatus>();
             }

 ngOnInit() {
 }

 /* /////////////////////////////////////////// */
/*  public uploadFile = (files) => {
   if (files.length === 0) {
     return;
   }

   const fileToUpload = files[0] as File;


   this.service.postFile(fileToUpload)
     .subscribe(event => {
       if (event.type === HttpEventType.UploadProgress) {
         this.progress = Math.round(100 * event.loaded / event.total);
       } else if (event.type === HttpEventType.Response) {
         this.message = 'Upload success.';
         this.onUploadFinished.emit(event.body);
       }
     });
} */
////////////////////////////////////////////////////////

public upload(event) {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    this.uploadStatus.emit({status: ProgressStatusEnum.START});
    this.service.postFile(file).subscribe(
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
        }
      },
      error => {
        this.inputFile.nativeElement.value = '';
        this.uploadStatus.emit({status: ProgressStatusEnum.ERROR});
      }
    );
  }
}
}
