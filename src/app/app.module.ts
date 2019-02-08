import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ReactiveFormsModule} from "@angular/forms";
import {FileDropDirective, FileSelectDirective} from "ng2-file-upload";
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {HttpClientModule} from "@angular/common/http";

import { NavigationComponent } from './navigation/navigation.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ScheduleJobsComponent } from './schedule-jobs/schedule-jobs.component';

import {CustomMaterialModule} from "./shared/modules/material.module";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FileUploadComponent,
    ScheduleJobsComponent,
    FileSelectDirective,
    FileDropDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AmazingTimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
