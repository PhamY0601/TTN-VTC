import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CitiesService} from "../../../shared/services/cities.service";
import {ActivatedRoute} from "@angular/router";
import {COUNTRY} from "../../../app.constants";
import {DistrictService} from "../../../shared/services/district.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DashboardService} from "../../../shared/services/dashboard.service";

@Component({
  selector: 'app-install-management',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  overviewData: any[] = [];
  installData: any[] = [];
  param?: string | null = '';
  title_country: any;
  array = {};
  newsData: any[] = [];


  constructor(private citiesService$: CitiesService,
              private districtService$: DistrictService,
              private dashboardService$: DashboardService,
              private activatedRoute: ActivatedRoute,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.overviewData = [
      {
        "title": "Nhà cung cấp",
        "count": 0,
        "icon": "supplier"
      },
      {
        "title": "Loa",
        "count": 0,
        "icon": "speaker"
      },
      {
        "title": "Bản tin điện tử",
        "count": 0,
        "icon": "youtube"
      },
      {
        "title": "Bản tin phát hành",
        "count": 0,
        "icon": "document",
      },
    ]

    this.activatedRoute.paramMap.subscribe(params => {
      this.param = params.get('district');
    });
    this.loadData(COUNTRY());
    this.title_country = COUNTRY();

  }


  loadData(_COUNTRY:any): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);

    this.dashboardService$.getTotal().subscribe((res) => {
      let arrayFirst = res.filter((item: any) => item.name === 'total').map((item: any) => item.value)
      this.overviewData = arrayFirst[0];

      let arraySecond = res.filter((item: any) => item.name === 'record_field').map((item: any) => item.value)
      this.newsData = arraySecond[0];

      let arrayThird = res.filter((item: any) => item.name === 'device_status').map((item: any) => item.value)
      this.installData = arrayThird[0];

    })
    }



}
