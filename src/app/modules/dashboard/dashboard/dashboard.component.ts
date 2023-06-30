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
  newsData: any[] = [];
  installData: any[] = [];
  typeData: any[] = [];
  param?: string | null = '';
  title_country: any;
  array = {};

  constructor(private dashboardService$: DashboardService,
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

 //Lấy dữ liệu từ API
  loadData(_COUNTRY:any): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);

    //lấy số liệu
    this.dashboardService$.getTotal().subscribe((res) => {
      let arrayOverview = res.filter((item: any) => item.name === 'total').map((item: any) => item.value)
      this.overviewData =  arrayOverview[0];

      //Bản tin đang phát
      let arrayRecordActive = res.filter((item: any) => item.name === 'record_active').map((item: any) => item.value)

      arrayRecordActive[0].sort((item1: any, item2: any) => {
        let date1: any = new Date(item1.date);
        let date2: any = new Date(item2.date);
        return date2 - date1;
      });
      this.newsData = arrayRecordActive[0];

      //Số lượng lắp đặt
      let arrayDeviceStatus = res.filter((item: any) => item.name === 'device_status').map((item: any) => item.value)
      this.installData = arrayDeviceStatus[0];

      let arrayRecordField = res.filter((item: any) => item.name === 'record_field').map((item: any) => item.value)
      this.typeData = arrayRecordField[0];
    })
  }



}
