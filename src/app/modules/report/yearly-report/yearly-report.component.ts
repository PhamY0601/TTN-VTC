import {Component, OnInit} from '@angular/core';
import {COUNTRY} from "../../../app.constants";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-yearly',
  templateUrl: './yearly-report.component.html',
  styleUrls: ['./yearly-report.component.scss']
})
export class YearlyReportComponent implements OnInit{
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
