import {Component, OnInit} from '@angular/core';
import {COUNTRY} from "../../../app.constants";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.scss']
})
export class MonthlyReportComponent implements OnInit{
  title_country: any
  today = new Date();

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
