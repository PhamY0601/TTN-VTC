import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';

import {ActivatedRoute, Data, Router} from "@angular/router";
import {EmergencyBroadcastingService} from "../../../shared/services/emergency-broadcasting.service";
import * as moment from "moment";
import {API} from "../../../helper/api";

@Component({
  selector: 'broadcasting-detail-component',
  templateUrl: './broadcasting-detail-dialog.component.html',
  styleUrls: ['./broadcasting-detail-dialog.component.scss']
})
export class BroadcastingDetailContentComponent implements OnInit {
  data: any;
  isSaving = false;
  time: any;
  param: any;
  dataSourceFirst: any;
  displayedColumnFirst: string[] = ['stt', 'station', 'speaker', 'time'];

  dataSourceSecond: any;
  displayedColumnSecond: string[] = ['stt', 'station', 'speaker', 'time', 'time_request', 'ratio'];

  dataSourceThird: any;
  displayedColumnThird: string[] = ['title', 'content'];



  constructor(
    public dialogRef: MatDialogRef<BroadcastingDetailContentComponent>,
  ) {
  }

  ngOnInit(): void {

  }

  save() {
    console.log(this.data)
  }

  calculateRatio(a: number, b: number) {
    return ((a / b) * 100).toFixed(0);
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
  selector: 'warning-dialog-component',
  template: '',
})
export class BroadcastingDetailDialogComponent implements OnInit, OnDestroy {
  param?: any;
  detailData: any;

  private dialogRef: MatDialogRef<BroadcastingDetailContentComponent> | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private emergencyBroadcastingService$: EmergencyBroadcastingService
  ) {
  }

  ngOnInit() {
    // this.activatedRoute.data.subscribe(({data}: Data) => {
    this.activatedRoute.paramMap.subscribe(params => {
      this.param = params.get('id');

    });


    this.emergencyBroadcastingService$.getDetail(this.param).subscribe((data) => {
      this.detailData = data;
      console.log(this.detailData.agencies)

      this.dialogRef = this.dialog.open(BroadcastingDetailContentComponent, {
        width: '800px',
      });

      this.dialogRef.componentInstance.data = this.detailData
      //Lấy id
      this.dialogRef.componentInstance.param = this.param
      //Lấy danh sách trạm
      this.dialogRef.componentInstance.dataSourceFirst = this.detailData.agencies;
      //Lấy danh sách loa phát
      this.dialogRef.componentInstance.dataSourceSecond = this.detailData.destinations;
      console.log(this.detailData.receive_station)
      //Lấy chi tiết nội dung

      this.dialogRef.componentInstance.dataSourceThird = [
        {
          title: 'Tiêu đề:',
          content: this.detailData.title,
        },
        {
          title: 'Nội dung:',
          content: this.detailData.content,
        },
        {
          title: 'Thời gian',
          content:  this.detailData.start_time + '-' + this.detailData.end_time
        },
        {
          title: 'Thời lượng',
          content: (this.detailData.duration/60).toFixed(0) + ' phút',
        },
        {
          title: 'Trạm tiếp nhận',
          content: this.detailData.receive_station ,
        },
        {
          title: 'Số loa đã phát',
          content: this.detailData.total_device_playing + '/' + this.detailData.total_device,
        },
        {
          title: 'Tổng thời lượng yêu cầu phát',
          content: (this.detailData.total_duration/60).toFixed(0) + ' phút'
        },

      ];

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
}
