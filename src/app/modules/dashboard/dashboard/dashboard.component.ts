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


  loadData(_COUNTRY: any): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);

    this.dashboardService$.getTotal().subscribe((res) => {
      this.overviewData = res
    })

    this.dashboardService$.getRecordActive().subscribe((res) => {
      console.log(res)
    })

    if (this.param !== null) {
      // this.districtService$.getOverView(_COUNTRY, this.param).subscribe((data) => {
      //   this.overviewData = data
      //
      // });

      this.districtService$.getInfoDistrict(_COUNTRY, this.param).subscribe((data) => {
          this.installData = data;
        }
      )
    } else {
      // this.citiesService$.getOverView(_COUNTRY).subscribe((data) => {
      //   this.overviewData = data
      // });
      this.citiesService$.getInstallInfo(_COUNTRY).subscribe((data) => {
        this.installData = data;
      });
    }
  }


}
