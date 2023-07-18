import {Component, OnInit} from '@angular/core';
import {COUNTRY} from "../../../app.constants";
import {NgxSpinnerService} from "ngx-spinner";
import {CitiesService} from "../../../shared/services/cities.service";
import {LocationsService} from "../../../shared/services/locations.service";

@Component({
  selector: 'app-report-radio-content',
  templateUrl: './date-report.component.html',
  styleUrls: ['./date-report.component.scss']
})
export class DateReportComponent implements OnInit {
  districtsData: any[] = [];
  wardsData: any[] = [];
  title_country: any
  toDay = new Date();
  beforeDay = new Date();
  display: boolean = false;

  constructor(private spinner: NgxSpinnerService,
              private locationsService$: LocationsService) {
  }

  ngOnInit() {
    this.beforeDay.setDate(this.beforeDay.getDate() - 15);
    this.title_country = COUNTRY();
    this.getDistrict()
  }




  displayContent() {
    if(this.display === false) {
      this.display = true;
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);

    }
  }

  getDistrict() {
    this.locationsService$.getLocations().subscribe((data) => {
      data[0].children.forEach((district:any) => {
        this.districtsData.push({
          code: district.Code,
          name: district.Name,
        })
      })

    })
  }

  districtEffect(code: any): void {
    this.wardsData = [];
    this.getWard(code)
  }

  getWard(code:any):void {
    this.locationsService$.getLocations().subscribe((data) => {
      data[0].children.forEach((district:any) => {
        if(district.Code === code) {
          district.children.forEach((ward:any) => {
            this.wardsData.push({
              code: ward.Code,
              name: ward.Name,
            })
          })

        }
      })

    })
  }
}
