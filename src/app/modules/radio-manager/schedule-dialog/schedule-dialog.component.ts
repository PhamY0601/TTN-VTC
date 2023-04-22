import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Data, Router} from "@angular/router";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'schedule-component',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleContentComponent implements OnInit {
  data: any;
  isSaving = false;
  week_day = [
    {
      name: 'Chủ nhật',
      value: '1',
      checked: false
    },
    {
      name: 'Thứ 2',
      value: '2',
      checked: false
    },
    {
      name: 'Thứ 3',
      value: '3',
      checked: false
    },
    {
      name: 'Thứ 4',
      value: '4',
      checked: false
    },
    {
      name: 'Thứ 5',
      value: '5',
      checked: false
    },
    {
      name: 'Thứ 6',
      value: '6',
      checked: false
    },
    {
      name: 'Thứ 7',
      value: '7',
      checked: false
    },
  ];
  months = [
    {
      name: 'Tháng 1',
      value: '1',
      checked: false
    },
    {
      name: 'Tháng 2',
      value: '2',
      checked: false
    },
    {
      name: 'Tháng 3',
      value: '3',
      checked: false
    },
    {
      name: 'Tháng 4',
      value: '4',
      checked: false
    },
    {
      name: 'Tháng 5',
      value: '5',
      checked: false
    },
    {
      name: 'Tháng 6',
      value: '6',
      checked: false
    },
    {
      name: 'Tháng 7',
      value: '7',
      checked: false
    },
    {
      name: 'Tháng 8',
      value: '8',
      checked: false
    },
    {
      name: 'Tháng 9',
      value: '9',
      checked: false
    },
    {
      name: 'Tháng 10',
      value: '10',
      checked: false
    },
    {
      name: 'Tháng 11',
      value: '11',
      checked: false
    },
    {
      name: 'Tháng 12',
      value: '12',
      checked: false
    },
  ];
  days = [
    {
      value: '1',
      checked: false
    },
    {
      value: '2',
      checked: false
    },
    {
      value: '3',
      checked: false
    },
    {
      value: '4',
      checked: false
    },
    {
      value: '5',
      checked: false
    },
    {
      value: '6',
      checked: false
    },
    {
      value: '7',
      checked: false
    },
    {
      value: '8',
      checked: false
    },
    {
      value: '9',
      checked: false
    },
    {
      value: '10',
      checked: false
    },
    {
      value: '11',
      checked: false
    },
    {
      value: '12',
      checked: false
    },

    {
      value: '13',
      checked: false
    },
    {
      value: '14',
      checked: false
    },
    {
      value: '15',
      checked: false
    },
    {
      value: '16',
      checked: false
    },
    {
      value: '17',
      checked: false
    },
    {
      value: '18',
      checked: false
    },
    {
      value: '19',
      checked: false
    },
    {
      value: '20',
      checked: false
    },
    {
      value: '21',
      checked: false
    },
    {
      value: '22',
      checked: false
    },
    {
      value: '23',
      checked: false
    },
    {
      value: '24',
      checked: false
    },

    {
      value: '25',
      checked: false
    },
    {
      value: '26',
      checked: false
    },
    {
      value: '27',
      checked: false
    },
    {
      value: '27',
      checked: false
    },
    {
      value: '29',
      checked: false
    },
    {
      value: '30',
      checked: false
    },
    {
      value: '31',
      checked: false
    },
  ];
  checkedDays: any[] = []
  checkedDays2: any;
  param?: string | null = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ScheduleContentComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  save() {
    console.log(this.data)
  }


  private onSaveSuccess(): void {
    // this.eventManager.broadcast({
    //   name: 'radioManagerModified',
    //   content: '',
    // });
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
      this.dialogRef = this.dialog.open(ScheduleContentComponent, {
        disableClose: true,
        width: '1000px',

      });
      data.week_day = data.week_day.split(',');
      data.month = data.month.split(',');
      data.day = data.day.split('');
      this.weekDayEffect(this.dialogRef.componentInstance.week_day, data.week_day);
      this.weekDayEffect(this.dialogRef.componentInstance.months, data.month);
      this.weekDayEffect(this.dialogRef.componentInstance.days, data.day)
      this.dialogRef.componentInstance.data = data;

      // this.dialogRef.componentInstance.checkedDays = data.week_day.split(',').map((n: any) => "Thứ " + n);
      // this.dialogRef.componentInstance.checkedDays2 = data.week_day.split(',').map((n: any) => true);
      // console.log(this.dialogRef.componentInstance.checkedDays2)
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

  weekDayEffect(days:any, week_day: any) {
    for(let i in days) {
      for( let j in week_day) {
        if(days[i].value === week_day[j])
        {
          days[i].checked = true;
        }
      }
    }

  }
}
