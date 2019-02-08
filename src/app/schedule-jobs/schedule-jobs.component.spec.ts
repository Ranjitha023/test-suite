import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleJobsComponent } from './schedule-jobs.component';

describe('ScheduleJobsComponent', () => {
  let component: ScheduleJobsComponent;
  let fixture: ComponentFixture<ScheduleJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
