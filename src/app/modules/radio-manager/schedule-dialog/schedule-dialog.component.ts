import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Data, Router} from "@angular/router";
import {week_day, months, days} from "../../../app.constants";


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'schedule-component',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleContentComponent implements OnInit {
  data: any;
  isSaving = false;
  week_day = week_day
  months = months
  days = days

  param?: string | null = '';

  constructor(
    public dialogRef: MatDialogRef<ScheduleContentComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  save() {
    console.log(this.data)
  }


  private onSaveSuccess(): void {

    this.dialogRef.close(true);
  }

  private onSaveError() {
    this.isSaving = false;
  }
}

@Component({
  selector: 'radio-manager-dialog-component',
  template: '',
})
export class ScheduleDialogComponent implements OnInit, OnDestroy {


  private dialogRef: MatDialogRef<ScheduleContentComponent> | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({data}: Data) => {
      console.log(data)
      console.log(data.repeat_month_year)
      this.dialogRef = this.dialog.open(ScheduleContentComponent, {
        disableClose: true,
        width: '1000px',
      });

      this.dialogRef.componentInstance.data = data;
      this.weekDayEffect(this.dialogRef.componentInstance.week_day, data.repeat_week_day);
      this.weekDayEffect(this.dialogRef.componentInstance.days, data.repeat_month_day);
      this.weekDayEffect(this.dialogRef.componentInstance.months, data.repeat_month_year)

      this.dialogRef.afterClosed().subscribe(
        () => this.previousState(),
        () => this.previousState());
    });
  }

  previousState(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {},
      queryParamsHandling: 'merge'
    });
  }

  ngOnDestroy(): void {
    this.dialogRef = undefined;
  }

  weekDayEffect(days: any, week_day: any) {
    days.forEach((day_1:any) => {
      week_day.forEach((day_2:any)=> {
        if(day_1.value === day_2) {
          day_1.checked = true
        }
      })
    })
  }

}
