
import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { Route } from '@angular/compiler/src/core';
import { HttpEventType, HttpClient  } from '@angular/common/http';
import { ProgressStatus, ProgressStatusEnum } from 'src/app/models/progress-status.model';
import { Documento } from 'src/app/Models/documento.model';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Input() public id: number;
  @Input() public documento: Documento;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  constructor(private service: ProjectService, private http: HttpClient) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
   }


  ngOnInit() {
  }

  public download() {
    this.downloadStatus.emit( {status: ProgressStatusEnum.START});
    console.log(this.fileName + '-Enter in Download method in Frontend');
    this.service.downloadFile(this.id).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            this.downloadStatus.emit( {status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100)});
            break;
          case HttpEventType.Response:
            this.downloadStatus.emit( {status: ProgressStatusEnum.COMPLETE});
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = this.fileName;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
      },
      error => {
        this.downloadStatus.emit( {status: ProgressStatusEnum.ERROR});
      }
    );
  }

}
