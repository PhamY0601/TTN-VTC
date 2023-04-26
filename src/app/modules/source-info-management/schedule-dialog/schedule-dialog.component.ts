import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SourceInfoManagementService} from "../../../shared/services/source-info-management.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'schedule-component',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleContentComponent implements OnInit {
  data: any;
  isSaving = false;
  snapshotUrl: any;

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
      this.param = Number(params.get('id'));
    });

    let a = this.activatedRoute.snapshot.url[0].path;

    if (a === 'schedule-field-source') {
      this.getData = this.sourceInfoService$.getFieldSource()
    }
    else {
      this.getData = this.sourceInfoService$.getGeographicSource()
    }
    this.getData.subscribe((data: { body: any[]; }) => {
      this.detailData = data.body;
      this.detailData = this.detailData.filter((item: any) => item.id === this.param);
      this.dialogRef = this.dialog.open(ScheduleContentComponent, {
        disableClose: true,
        width: '500px',
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
