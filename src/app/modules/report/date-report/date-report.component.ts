import {Component, OnInit} from '@angular/core';
import {COUNTRY} from "../../../app.constants";
import {NgxSpinnerService} from "ngx-spinner";
import {CitiesService} from "../../../shared/services/cities.service";

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
              private citiesService$: CitiesService) {
  }

  ngOnInit() {
    this.beforeDay.setDate(this.beforeDay.getDate() - 15);
    this.title_country = COUNTRY();
  }


  districtEffect(event: any): void {
    // this.wardsData = [];
    // this.citiesService$.getWards(event.value).subscribe((data) => {
    //   this.wardsData = data
    // })
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

}
