import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AmazingTimePickerService } from 'amazing-time-picker';
import {FileUploader} from "ng2-file-upload";
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-schedule-jobs',
  templateUrl: './schedule-jobs.component.html',
  styleUrls: ['./schedule-jobs.component.css']
})
export class ScheduleJobsComponent implements OnInit {
  public selectedTime = '18:33';
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  scheduleForm: FormGroup;
  
  public uploader:FileUploader = new FileUploader({
    isHTML5: true
  });

  constructor(private fb: FormBuilder,private atp: AmazingTimePickerService, private http: HttpClient) { }

  ngOnInit() {
    this.getFileNames();
    this.scheduleForm = this.fb.group({
      daySelected:  new FormControl([]),
      date: [null, null],
      time: [null, null],
      jobName:  [null, Validators.compose([Validators.required])],
      files: [null,null]
    });
    
  }

  getFileNames() {
    return this.http.get<any>('http://localhost:9000/brap/api/allJobs').pipe(map(
    (response:Response) => {
      return response.json();
    }
  )).subscribe(data=>{
      console.log(data);
     },error=> error);
  }

  scheduleJob(){
    let data = new FormData();
    for (var j = 0; j < this.uploader.queue.length; j++) {
      let fileItem = this.uploader.queue[j]._file;
      data.append('configXml',fileItem);
    }
    data.append('jobName',this.scheduleForm.controls.jobName.value);
    var str = this.scheduleForm.get('daySelected').value.toString();
    var regex = new RegExp(',', 'g');
    str = str.replace(regex,';');
    alert(str+"::"+this.selectedTime);
    data.append('jobScheduleString',str+"::"+this.selectedTime+";");
    this.scheduleJobs(data).subscribe(dataResponse => alert(dataResponse), error => error);
}

open() {
  const amazingTimePicker = this.atp.open({
      theme: 'material-blue',
  });
  amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
  });
}

scheduleJobs(data: FormData): Observable<any> {
  return this.http.post<any>('http://localhost:9000/brap/api/createJob', data).pipe(map(
    (response:Response) => {
      console.log(response.json);
      return response.json;
    }
  ));
}

  

}
