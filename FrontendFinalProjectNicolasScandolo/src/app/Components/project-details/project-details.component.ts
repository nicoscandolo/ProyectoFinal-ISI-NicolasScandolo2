import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { Route } from '@angular/compiler/src/core';
import { HttpEventType, HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  // fileToUpload: File;
  public progress: number;
  public message: string;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private service: ProjectService,
              private http: HttpClient
              ) { }

  ngOnInit() {
  }

  /* /////////////////////////////////////////// */
  public uploadFile = (files) => {
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
  }

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
