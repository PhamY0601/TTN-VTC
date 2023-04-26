import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {CitiesService} from "../../../shared/services/cities.service";
import {EmergencyBroadcastingService} from "../../../shared/services/emergency-broadcasting.service";
import * as moment from "moment";

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
    // private eventManager: JhiEventManager,
    private formBuilder: FormBuilder,
    private citiesService$: CitiesService,
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
  totalTime = 0;

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
      this.param = Number(params.get('id'));

    });

    this.emergencyBroadcastingService$.getEmergencyBroadcasting().subscribe((data) => {
      this.detailData = data.filter((item: any) => item.id === this.param);
      let array = this.detailData[0].station_list;
      array.forEach((item:any) => {
        this.totalTime = this.totalTime + item.time
      })


      this.dialogRef = this.dialog.open(BroadcastingDetailContentComponent, {
        width: '800px',
      });
      this.dialogRef.componentInstance.param = this.param
      this.dialogRef.componentInstance.time = this.detailData[0].time;
      this.dialogRef.componentInstance.dataSourceFirst = this.detailData[0].station_list;
      this.dialogRef.componentInstance.dataSourceSecond = this.detailData[0].station_list;
      this.dialogRef.componentInstance.dataSourceThird = [

        {
          title: 'Tiêu đề:',
          content: this.detailData[0].title,
        },
        {
          title: 'Nội dung:',
          content: this.detailData[0].content,
        },
        {
          title: 'Người thực hiện',
          content: this.detailData[0].performer,
        },
        {
          title: 'Thời gian',
          content:  (moment(this.detailData[0].start_time *1000)).format('DD-MM-YYYY HH:mm'),
        },
        {
          title: 'Thời lượng',
          content: (this.detailData[0].time / 60).toFixed(0) + ' phút',
        },
        {
          title: 'Trạm tiếp nhận',
          content: this.detailData[0].receive_station,
        },
        {
          title: 'Loa đã phát',
          content: this.detailData[0].play_successful + '/' + this.detailData[0].speaker,
        },
        {
          title: 'Tổng thời lượng phát',
          content: ((this.totalTime / (this.detailData[0].time * this.detailData[0].station) )*100).toFixed(0) + '%',
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
