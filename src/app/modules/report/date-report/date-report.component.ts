import {Component, OnInit} from '@angular/core';
import {COUNTRY} from "../../../app.constants";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-report-radio-content',
  templateUrl: './date-report.component.html',
  styleUrls: ['./date-report.component.scss']
})
export class DateReportComponent implements OnInit{
  title_country: any
  toDate = new Date();
  constructor(  private spinner: NgxSpinnerService,) {
  }

  ngOnInit() {
    this.title_country = COUNTRY();
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
