import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from "@angular/forms";
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
  jobNames: string[] =[];
  
  public uploader:FileUploader = new FileUploader({
    isHTML5: true
  });

  constructor(private fb: FormBuilder,private atp: AmazingTimePickerService, private http: HttpClient) { }

  ngOnInit() {
    this.getFileNames().subscribe(
      data => {
        let scheduleInfo = data.dataContent.responseList;
        for(let schedule of scheduleInfo){
          this.jobNames.push(schedule.jobName);
        }
    });
    let times = new FormArray([]);
    times.push(new FormGroup({
      "time": new FormControl(null, Validators.required)
    }));
    this.scheduleForm = this.fb.group({
      daySelected:  new FormControl([]),
      date: [null, null],
      timeArray: times,
      jobName:  [null, Validators.compose([Validators.required])],
      files: [null,null]
    });
    
  }

  multipleTime(){
    (<FormArray>this.scheduleForm.get('timeArray')).push(new FormGroup({
      "time": new FormControl(null, Validators.required)
    }));
  }

  getTimesControl(){
    return (<FormArray>this.scheduleForm.get('timeArray')).controls;
  }

  getFileNames():Observable<any> {
    return this.http.get<any>('http://localhost:9000/brap/api/allJobs');
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

    var timeString='';
    if(this.scheduleForm.value.timeArray && this.scheduleForm.value.timeArray.length > 0){
      for(let i = 0; i<this.scheduleForm.value['timeArray'].length; i++){
        timeString = timeString + this.scheduleForm.value.timeArray[i].time + ";";
      }
    }
    data.append('jobScheduleString',str+"::"+timeString);
    this.scheduleJobs(data).subscribe(dataResponse => alert(dataResponse), error => error);
}

open(i: number) {
  const amazingTimePicker = this.atp.open({
      theme: 'material-blue',
  });
  amazingTimePicker.afterClose().subscribe(time => {
    (<FormArray>this.scheduleForm.get('timeArray')).controls[i].patchValue({"time": time});
  });
}

scheduleJobs(data: FormData): Observable<any> {
  return this.http.post<any>('http://localhost:9000/brap/api/createJob', data).pipe(map(
    (response:Response) => {
      return response.json;
    }
  ));
}

  

}
