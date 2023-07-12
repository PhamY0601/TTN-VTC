import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Data, Router} from "@angular/router";
import {CitiesService} from "../../../shared/services/cities.service";
import {sourceData, voiceData} from "../../../app.constants";
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
  currentTime= new Date();

  textToSpeechData: ISrcParams = new SrcParams();

  constructor(public dialogRef: MatDialogRef<EmergencyBroadcastingContentComponent>,
              private emergencyBroadcastingService$: EmergencyBroadcastingService,
              private locationsService$: LocationsService) {
  }

  ngOnInit(): void {
    this.data.start = this.currentTime.getHours() + ':' + this.currentTime.getMinutes()
    this.getLocations()

  }

  getLocations() {
    this.locationsService$.getLocations().subscribe(data => {
      this.cityData = data
      console.log(this.cityData)
    })

  }

  save() {

    let districts = this.cityData[0].children;

    districts.forEach((district:any) => {
      if(district.check === true) {
        district.children.forEach((ward: any) => {
          console.log(ward)
          this.data.locations?.push({
            Ward: ward.Code,
            District: ward.ParentCode,
            Province: district.ParentCode
          })
        })
      }
    })

    this.data.src_type = 'TTS';
    this.data.src_params = JSON.stringify(this.textToSpeechData)

    this.emergencyBroadcastingService$.post(this.data).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );


  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.audSrc = URL.createObjectURL(event.target.files[0]);
    }
  }

  selectAllChanged() {

    this.cityData[0].check = !this.cityData[0].check;

    this.cityData[0].children.forEach((district: any) => {
      district.check = this.cityData[0].check;

      if (district.children) {
        district.children.forEach((child: any) => {
          child.check = this.cityData[0].check;
        });
      }
    });
  }

  districtChanged(district: any) {
    if (district.children) {
      district.children.forEach((ward: any) => ward.check = district.check);
    }
    this.updateAllComplete()
  }

  wardChanged(ward: any) {
    ward.check = !ward.check
    // tìm huyện có xã được check
    let district = this.cityData[0].children.find((district: any) => district.Code === ward.ParentCode);

    if (district) {

      //cập nhật trạng thái cua huyện
      district.check = district.children.every((child: any) => child.check);
      console.log(district);

    }
    this.updateAllComplete()
  }


  updateAllComplete() {
    this.cityData[0].check = this.cityData[0].children.every((item: any) => item.check);

  }

  someChecked(item: any) {
    if (!item?.children || item?.children.length === 0) {
      return false;
    }

    const checkedChildren = item?.children.filter((child: any) => child?.check);
    return checkedChildren.length > 0 && checkedChildren.length < item?.children.length;
  }

  select(event: any) {
    this.selected = event.value;
  }


  isEndTimeValid() {
   return this.data.end && this.data.start && this.data.end > this.data.start;
  }

  private onSaveSuccess(): void {
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.emergencyBroadcastingService$.getEmergencyBroadcasting().subscribe((data:any) =>{
        this.emergencyBroadcastingService$.changeData(data);
      });
    });

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

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private citiesService$: CitiesService,
              private spinner: NgxSpinnerService,) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({data}: Data) => {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
      this.dialogRef = this.dialog.open(EmergencyBroadcastingContentComponent, {
        width: '800px',
      });
      this.dialogRef.afterClosed().subscribe(
        () => this.previousState(),
        () => this.previousState());
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
