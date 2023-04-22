import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'schedule-component',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleContentComponent implements OnInit {
  data: any;
  isSaving = false;
  param?: string | null = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: any;
  displayedColumn: string[] = ['stt', 'content', 'time'];


  constructor(
    // private eventManager: JhiEventManager,
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
  scheduleData = [
    {
      id: 0,
      content: 'Kinh tế',
      time: '10:00 – 11:00',
    },
    {
      id: 1,
      content: 'Chính trị',
      time: '11:00 – 12:00'
    },
    {
      id: 2,
      content: 'Xã hội',
      time: '12:00 – 13:00'
    },
  ]

  private dialogRef!: MatDialogRef<ScheduleContentComponent> ;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {

      this.dialogRef = this.dialog.open(ScheduleContentComponent, {
        disableClose: true,
        width: '500px',

      });
    this.dialogRef.componentInstance.dataSource = this.scheduleData

      this.activatedRoute.paramMap.subscribe(params => {
        this.dialogRef.componentInstance.param = params.get('district');
      });

      // this.dialogRef.componentInstance.checkedDays = data.week_day.split(',').map((n: any) => "Thứ " + n);
      // this.dialogRef.componentInstance.checkedDays2 = data.week_day.split(',').map((n: any) => true);
      // console.log(this.dialogRef.componentInstance.checkedDays2)
      this.dialogRef.afterClosed().subscribe(
        () => this.previousState(),
        () => this.previousState());
    }


  previousState(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {},
      queryParamsHandling: 'merge'
    });
  }

  ngOnDestroy(): void {
    // this.dialogRef = undefined;
  }

}
