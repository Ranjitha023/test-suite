import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  uploadForm: FormGroup;

  public uploader:FileUploader = new FileUploader({
    isHTML5: true
  });

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  uploadSubmit(){
        let data = new FormData();
        for (var j = 0; j < this.uploader.queue.length; j++) {
          let fileItem = this.uploader.queue[j]._file;
          data.append('files',fileItem);
        }
        data.append( 'jobName', this.uploadForm.controls.jobName.value);
        console.log(data.getAll('files'));
        this.uploadFile(data).subscribe(data => alert("Success"), error => alert(error));
        this.uploader.clearQueue();
  }

  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:9000/brap/api/uploadFiles', data).pipe(map(
      (response:Response) => {
        console.log(response.json);
        return response.json;
      }
    ));
  }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      files: [null, Validators.compose([Validators.required])],
      jobName:  [null, Validators.compose([Validators.required])]
    });
  }

}
