import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileUploadComponent } from './file-upload/file-upload.component';
import { ScheduleJobsComponent } from './schedule-jobs/schedule-jobs.component';

const routes: Routes = [
  {path:'', component: FileUploadComponent, data: { title: 'Upload test Scripts' }},
  {path:'file-upload', component: FileUploadComponent, data: { title: 'Upload test Scripts' }},
  {path:'schedule-jobs', component: ScheduleJobsComponent, data: { title: 'Schedule Jobs' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
