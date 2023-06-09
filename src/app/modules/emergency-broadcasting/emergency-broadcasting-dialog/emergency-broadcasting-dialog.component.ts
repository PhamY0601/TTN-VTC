import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Data, Router} from "@angular/router";
import {CitiesService} from "../../../shared/services/cities.service";
import {COUNTRY, COUNTRY_TITLE, sourceData, voiceData} from "../../../app.constants";
import {NgxSpinnerService} from "ngx-spinner";
import {
  EmergencyBroadcast,
  IEmergencyBroadcasting,
  ISrcParams,
  SrcParams
} from "../../../shared/models/emergency-broadcasting.model";
import {EmergencyBroadcastingService} from "../../../shared/services/emergency-broadcasting.service";
import {LocationsService} from "../../../shared/services/locations.service";


@Component({
  selector: 'emergency-broadcasting-component',
  templateUrl: './emergency-broadcasting-dialog.component.html',
  styleUrls: ['./emergency-broadcasting-dialog.component.scss']
})
export class EmergencyBroadcastingContentComponent implements OnInit {

  @ViewChild('figAudio') figAudio!: ElementRef;
  displayDistrict = false;
  data: IEmergencyBroadcasting = new EmergencyBroadcast();
  isSaving = false;
  districtsData: any[] = [];
  wardsData: any[] = [];
  transmitterData = ['#01', '#02', '#03', '#04', '#05'];
  libraryData = ['Thư viện 1', 'Thư viện 2', 'Thư viện 3', 'Thư viện 4', 'Thư viện 5'];
  relayData = ['#01', '#02', '#03', '#04', '#05'];
  audSrc: any;
  selected = -1;
  sourceData = sourceData;
  voiceData = voiceData;
  cityData: any[] = [];
  currentTime: any;
  allComplete: boolean = false;
  textToSpeechData: ISrcParams = new SrcParams();

  constructor(public dialogRef: MatDialogRef<EmergencyBroadcastingContentComponent>,
              private emergencyBroadcastingService$: EmergencyBroadcastingService,
              private locationsService$: LocationsService) {
  }

  ngOnInit(): void {
    this.getLocations()
  }

  getLocations() {
    this.locationsService$.getLocations().subscribe(data => {
      console.log(data)
      this.cityData = data
    })

  }

  save() {
    // console.log(this.nodeItem);
    // let districts = this.nodeItem[0].children;
    // for (let i in districts) {
    //   let wards = districts[i].children;
    //   for (let j in wards) {
    //     if (wards[j].check === true) {
    //      this.data.locations?.push({Provine: districts[i].name, District: wards[j].name})
    //     }
    //   }
    // }

    this.data.src_type = 'TTS';
    this.data.src_params = JSON.stringify(this.textToSpeechData)
    this.emergencyBroadcastingService$.post(this.data).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );


  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const audSrc = URL.createObjectURL(event.target.files[0]);
      this.audSrc = audSrc;
    }
  }


  setAll(completed: boolean) {
    // this.allComplete = completed;
    // if (this.nodeItem[0].children == null) {
    //   return;
    // }
    // this.nodeItem[0].children.forEach((item: any) => {
    //   item.check = completed;
    //   this.selectAllWard(completed)
    // });

  }

  selectAllWard(completed: boolean) {
    // let city = this.nodeItem[0].children;
    // if (city === null) {
    //   return
    // }
    // city.forEach((district: any) => {
    //   if (district.check === completed) {
    //     district.children.forEach((ward: any) => {
    //       ward.check = completed
    //     })
    //   }
    // });
    return false

  }

  someComplete(): boolean {
    // if (this.nodeItem[0].children == null) {
    //   return false;
    // }
    // return this.nodeItem[0].children.filter((t: any) => t.check).length > 0 && !this.allComplete;
    return false
  }

  updateAllComplete() {
    // this.allComplete = this.nodeItem[0].children != null && this.nodeItem[0].children.every((t: any) => t.check);
  }

  select(event: any) {
    this.selected = event.value;
  }


  isEndTimeValid() {
    return this.data.end && this.data.start && this.data.end > this.data.start;
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
  selector: 'warning-dialog-component', template: '',
})
export class EmergencyBroadcastingDialogComponent implements OnInit, OnDestroy {

  private dialogRef: MatDialogRef<EmergencyBroadcastingContentComponent> | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog, private citiesService$: CitiesService, private spinner: NgxSpinnerService,) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({data}: Data) => {

      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 3500);

      let nodeItem: any[] = [];
      let childrenArray: any[] = [];
      // Promise.all(promises).then(values => {
      //   const [res1, res2] = values;
      //   let array: any[] = [];
      //   res1.forEach((item: any) => {
      //     array = []
      //     res2.forEach((value: any) => {
      //       if (value.districtId === item.nameId) {
      //         array.push({name: value.name, check: false})
      //       }
      //     })
      //     childrenArray.push({
      //       name: item.name,
      //       children: array,
      //       display: false,
      //       check: false
      //     })
      //     nodeItem = [{
      //       name: COUNTRY_TITLE(),
      //       check: false,
      //       children: childrenArray
      //     }]
      //   })
      //
      //        });

      this.dialogRef = this.dialog.open(EmergencyBroadcastingContentComponent, {
        width: '800px',
      });
      // this.dialogRef.componentInstance.nodeItem = nodeItem
      // this.dialogRef.componentInstance.data = data;
      this.dialogRef.afterClosed().subscribe(() => this.previousState(), () => this.previousState());

    });


  }

  previousState(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent, queryParams: {}, queryParamsHandling: 'merge'
    });
  }

  ngOnDestroy(): void {
    this.dialogRef = undefined;
  }


}
