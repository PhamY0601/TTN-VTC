import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {CitiesService} from "../../../shared/services/cities.service";
import {COUNTRY, COUNTRY_TITLE, currentTime} from "../../../app.constants";
import {ITreeOptions} from '@circlon/angular-tree-component';
import {timeout} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'emergency-broadcasting-component',
  templateUrl: './emergency-broadcasting-dialog.component.html',
  styleUrls: ['./emergency-broadcasting-dialog.component.scss']
})
export class EmergencyBroadcastingContentComponent implements OnInit {
  @ViewChild('figAudio') figAudio!: ElementRef;
  data: any;
  isSaving = false;
  districtsData: any[] = [];
  wardsData: any[] = [];
  transmitterData = ['#01', '#02', '#03', '#04', '#05'];
  libraryData = ['Thư viện 1', 'Thư viện 2', 'Thư viện 3', 'Thư viện 4', 'Thư viện 5'];
  relayData = ['#01', '#02', '#03', '#04', '#05'];
  audSrc: any;
  selected = -1;
  sourceData = {
    name: 'Nguồn phát',
    completed: false,
    value: '10',
    subtasks: [
      {name: 'File âm thanh', completed: false, value: 3},
      {name: 'Văn bản', completed: false, value: 4},
      {name: 'Transmitter', completed: false, value: 1},
      {name: 'Thư viện', completed: false, value: 2},
      {name: 'Tiếp âm', completed: false, value: 5},
    ],
  };
  nodeItem: any[] = [];
  currentTime: any;
  treeOptions: ITreeOptions = {
    useCheckbox: true
  };

  constructor(
    public dialogRef: MatDialogRef<EmergencyBroadcastingContentComponent>,
  ) {  }

  ngOnInit(): void {
    this.currentTime = currentTime;
  }

  save() {
    console.log(this.data)
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const audSrc = URL.createObjectURL(event.target.files[0]);
      this.audSrc = audSrc;

    }
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

  select(event: any) {
    this.selected = event.value;
  }
}

@Component({
  selector: 'warning-dialog-component',
  template: '',
})
export class EmergencyBroadcastingDialogComponent implements OnInit, OnDestroy {


  private dialogRef: MatDialogRef<EmergencyBroadcastingContentComponent> | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private citiesService$: CitiesService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({data}: Data) => {
      const promises: Promise<any>[] = [
        this.citiesService$.getDistricts(COUNTRY()).toPromise(),
        this.citiesService$.getWards().toPromise()
      ];

      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 3500);

      let nodeItem: any[] = [];
      let childrenArray: any[] = [];
      Promise.all(promises).then(values => {
        const [res1, res2] = values;
        let array: any[] = [];
        res1.forEach((item: any) => {
          array = []
          res2.forEach((value: any) => {
            if (value.districtId === item.nameId) {
              array.push({name: value.name})
            }
          })
          childrenArray.push({
            name: item.name,
            children: array
          })
          nodeItem = [{
            name: COUNTRY_TITLE(),
            children: childrenArray
          }]
        })

        this.dialogRef = this.dialog.open(EmergencyBroadcastingContentComponent, {
          width: '800px',
        });
        this.dialogRef.componentInstance.nodeItem = nodeItem
        this.dialogRef.componentInstance.data = data;
        this.dialogRef.afterClosed().subscribe(
          () => this.previousState(),
          () => this.previousState());
      });


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
