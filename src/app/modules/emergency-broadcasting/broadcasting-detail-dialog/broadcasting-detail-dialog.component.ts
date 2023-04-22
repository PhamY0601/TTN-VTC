import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {CitiesService} from "../../../shared/services/cities.service";

@Component({
  selector: 'broadcasting-detail-component',
  templateUrl: './broadcasting-detail-dialog.component.html',
  styleUrls: ['./broadcasting-detail-dialog.component.scss']
})
export class BroadcastingDetailContentComponent implements OnInit {
  data: any;
  isSaving = false;

  dataSourceFirst: any;
  displayedColumnFirst: string[] = ['stt', 'station','speaker', 'time'];

  dataSourceSecond: any;
  displayedColumnSecond: string[] = ['stt', 'station','speaker', 'time', 'time_request', 'ratio'];

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
  calculateRatio (a:number, b: number) {
    return ((a/b)*100).toFixed(0);
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
  detailDataFirst = [
    {
      id: 0,
      station: 'Trạm 1',
      speaker: 10,
      play_successful: 9,
      time: '40'
    },
    {
      id: 1,
      station: 'Trạm 2',
      speaker: 10,
      play_successful: 7,
      time: '20'
    },
    {
      id: 2,
      station: 'Trạm 3',
      speaker: 10,
      play_successful: 4,
      time: '50'
    },
  ]

  detailDataSecond = [
    {
      id: 0,
      station: 'Trạm 1',
      speaker: 100,
      play_successful: 30,
      time: 20,
      time_request: 30,
    },
    {
      id: 1,
      station: 'Trạm 2',
      speaker: 20,
      play_successful: 10,
      time: 34,
      time_request: 60,
    },
    {
      id: 2,
      station: 'Trạm 3',
      speaker: 10,
      play_successful: 5,
      time: 40,
      time_request: 60,
    },
    {
      id: 3,
      station: 'Trạm 4',
      speaker: 50,
      play_successful: 30,
      time: 50,
      time_request: 80,
    },
    {
      id: 4,
      station: 'Trạm 5',
      speaker: 40,
      play_successful: 30,
      time: 50,
      time_request: 50,
    },

  ]

  detailDataThird = [

    {
      title: 'Tiêu đề:',
      content: 'Tiêu đề 1',
    },
    {
      title: 'Nội dung:',
      content: 'Nội dung 1',
    },
    {
      title: 'Người thực hiện',
      content: 'Lãnh đạo cấp huyện',
    },
    {
      title: 'Thời gian',
      content: '04:58',
    },
    {
      title: 'Thời lượng',
      content: '30 phút',
    },
    {
      title: 'Trạm tiếp nhận',
      content: 'Cấp huyện',
    },
    {
      title: 'Loa đã phát',
      content: '9/10',
    },
    {
      title: 'Tổng thời lương phát',
      content: '9/10',
    },

  ]

  private dialogRef: MatDialogRef<BroadcastingDetailContentComponent> | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({data}: Data) => {

      this.dialogRef = this.dialog.open(BroadcastingDetailContentComponent, {
        width: '800px',
      });
      this.dialogRef.componentInstance.dataSourceFirst  = this.detailDataFirst;
      this.dialogRef.componentInstance.dataSourceSecond = this.detailDataSecond;
      this.dialogRef.componentInstance.dataSourceThird = this.detailDataThird;
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
