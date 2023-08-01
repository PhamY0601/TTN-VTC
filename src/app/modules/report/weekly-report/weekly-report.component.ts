import {Component, OnInit} from '@angular/core';
import {COUNTRY} from "../../../app.constants";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-weekly-report',
  templateUrl: './weekly-report.component.html',
  styleUrls: ['./weekly-report.component.scss']
})
export class WeeklyReportComponent implements OnInit{
  title_country: any;
  today = new Date();
  beforeDay = new Date();

  constructor(  private spinner: NgxSpinnerService,) {}

  ngOnInit() {
    this.beforeDay.setDate(this.beforeDay.getDate() - 7);

    this.title_country = COUNTRY();
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
