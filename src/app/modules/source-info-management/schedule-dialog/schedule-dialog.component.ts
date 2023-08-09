import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Data, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SourceInfoManagementService} from "../../../shared/services/source-info-management.service";


@Component({
  selector: 'schedule-component',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleContentComponent implements OnInit {
  data: any;
  isSaving = false;
  snapshotUrl: any;
  currentTime: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: any;
  displayedColumn: string[] = ['stt', 'content', 'time'];


  constructor(
    public dialogRef: MatDialogRef<ScheduleContentComponent>,
  ) {}

  ngOnInit(): void {}

}

@Component({
  selector: 'radio-manager-dialog-component',
  template: '',
})
export class ScheduleDialogComponent implements OnInit, OnDestroy {
  param: any;
  detailData: any[] = [];
  getData: any;


  private dialogRef!: MatDialogRef<ScheduleContentComponent>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private sourceInfoService$: SourceInfoManagementService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.param = params.get('id');
    });

    let a = this.activatedRoute.snapshot.url[0].path;

    if (a === 'schedule-field-source') {
      this.getData = this.sourceInfoService$.getFieldSource()
    }
    else {
      this.getData = this.sourceInfoService$.getGeographicSource()
    }
    this.getData.subscribe((data: any) => {
      this.detailData = data;

      this.detailData = this.detailData.filter((item: any) => item.id === this.param);

      this.dialogRef = this.dialog.open(ScheduleContentComponent, {
        disableClose: true,
        width: '600px',
      });
      this.dialogRef.componentInstance.snapshotUrl = a;
      this.dialogRef.componentInstance.data = this.detailData
      this.dialogRef.componentInstance.dataSource = this.detailData[0].content

      this.dialogRef.afterClosed().subscribe(
        () => this.previousState(),
        () => this.previousState());
    })
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
