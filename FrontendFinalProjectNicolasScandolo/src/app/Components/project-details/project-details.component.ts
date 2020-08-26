import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { Route } from '@angular/compiler/src/core';
import { HttpEventType, HttpClient  } from '@angular/common/http';
import { ProgressStatusEnum, ProgressStatus } from 'src/app/models/progress-status.model';
import { Documento } from 'src/app/models/documento.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  public files: Documento;
  public fileInDownload: string;
  public percentage: number;
  public showProgress: boolean;
  public showDownloadError: boolean;
  public showUploadError: boolean;


  constructor(private service: ProjectService,
              private http: HttpClient
              ) { }

  ngOnInit() {
    this.getFiles();
  }

  private getFiles() {
    this.service.searchFilesList().subscribe(
      (data: Documento) => {
        this.files = data;
        console.log(this.files);
      }
    );
  }



  public downloadStatus(event: ProgressStatus) {
    switch (event.status) {
      case ProgressStatusEnum.START:
        this.showDownloadError = false;
        break;
      case ProgressStatusEnum.IN_PROGRESS:
        this.showProgress = true;
        this.percentage = event.percentage;
        break;
      case ProgressStatusEnum.COMPLETE:
        this.showProgress = false;
        break;
      case ProgressStatusEnum.ERROR:
        this.showProgress = false;
        this.showDownloadError = true;
        break;
    }
  }

  public uploadStatus(event: ProgressStatus) {
    switch (event.status) {
      case ProgressStatusEnum.START:
        this.showUploadError = false;
        break;
      case ProgressStatusEnum.IN_PROGRESS:
        this.showProgress = true;
        this.percentage = event.percentage;
        break;
      case ProgressStatusEnum.COMPLETE:
        this.showProgress = false;
        this.getFiles();
        break;
      case ProgressStatusEnum.ERROR:
        this.showProgress = false;
        this.showUploadError = true;
        break;
    }
  }

  /* /////////////////////////////////////////// */
/*   public uploadFile = (files) => {
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

/* ////////////////////////////////////////////// */

/*   handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity();
} */

/* uploadFileToActivity() {


    const reader = new FileReader();
    reader.onload = () => {
        console.log(reader.result);
    };
    const filee = reader.readAsText(this.fileToUpload);

    this.service.postFile2(filee).subscribe(data => {
      console.log('todo ok');
      }, error => {
        console.log(error);
      });
} */
}
