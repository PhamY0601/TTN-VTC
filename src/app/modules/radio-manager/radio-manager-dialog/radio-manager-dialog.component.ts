import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {currentTime, voiceData} from "../../../app.constants";
import {LocationsService} from "../../../shared/services/locations.service";
import {week_day, months, days, sourceData} from "../../../app.constants";

@Component({
  selector: 'radio-manager-content-componet',
  templateUrl: './radio-manager-dialog.component.html',
  styleUrls: ['./radio-manager-dialog.component.scss']
})
export class RadioManagerContentComponent implements OnInit {
  data: any;

  isSaving = false;
  displayDistrict = false;
  cityData: any[] = [];
  week_day = week_day;
  months = months;
  days = days;
  voiceData = voiceData;
  transmitterData = ['#01', '#02', '#03', '#04', '#05'];

  selected = -1;
  sourceData = sourceData;

  districtsData: any[] = [];
  wardsData: any[] = [];
  audSrc: any;

  constructor(
    public dialogRef: MatDialogRef<RadioManagerContentComponent>,
  ) {}

  ngOnInit(): void {
    this.data.start = new Date();
    this.data.end = new Date()
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

  select(event: any) {
    this.selected = event.value;
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


  private onSaveSuccess(): void {
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
export class RadioManagerDialogComponent implements OnInit, OnDestroy {

  private dialogRef: MatDialogRef<RadioManagerContentComponent> | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private locationsService$: LocationsService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({data}: Data) => {
      this.dialogRef = this.dialog.open(RadioManagerContentComponent, {
        width: '1000px',
      });
      this.dialogRef.componentInstance.data = data;

      this.weekDayEffect(this.dialogRef.componentInstance.week_day, data.repeat_week_day);
      this.weekDayEffect(this.dialogRef.componentInstance.days, data.repeat_month_day);
      this.weekDayEffect(this.dialogRef.componentInstance.months, data.repeat_month_year);

      this.dialogRef.componentInstance.data = data;

      this.locationsService$.getLocations().subscribe(location => {
        this.dialogRef!.componentInstance.cityData = location
        this.dialogRef!.componentInstance.cityData = this.locationEffect(this.dialogRef!.componentInstance.cityData, data.locations)
      })

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

  weekDayEffect(days: any, week_day: any) {
    if(week_day) {
      days.forEach((day_1: any) => {
        week_day.forEach((day_2: any) => {
          if (day_1.value === day_2) {
            day_1.checked = true
          }
        })
      })
    }

  }

  locationEffect(locationData: any, location: any): any {
    if(location) {
      locationData[0].children.forEach((district: any) => {
        location.forEach((loca: any) => {
          if (district.Code === loca.districtCode) {
            district.check = true
            district.children.forEach((ward: any) => {
              loca.wards.forEach((item: any) => {
                if (ward.Code === item.wardCode) {
                  ward.check = true
                }
              })
            })
          }
        })
      })
    }

    return locationData
  }

}
