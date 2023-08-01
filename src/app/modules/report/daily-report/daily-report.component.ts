import {Component, OnInit} from '@angular/core';
import {COUNTRY} from "../../../app.constants";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-report-radio-content',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss']
})
export class DailyReportComponent implements OnInit{
  title_country: any
  today = new Date();

  constructor(  private spinner: NgxSpinnerService,) {
  }
  ngOnInit() {
    this.title_country = COUNTRY();
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

}
