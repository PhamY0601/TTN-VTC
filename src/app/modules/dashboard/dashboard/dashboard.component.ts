import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CitiesService} from "../../../shared/services/cities.service";
import {ActivatedRoute} from "@angular/router";
import {COUNTRY} from "../../../app.constants";
import {DistrictService} from "../../../shared/services/district.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DashboardService} from "../../../shared/services/dashboard.service";
import {MatTableDataSource} from "@angular/material/table";
import {Chart} from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-dashboard',
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

  title: any[] = [];
  data: any[] = [];
  chart: any = [];
  backgroundColor = ['#2155CD', '#009EFF', '#00E7FF', '#00FFF6', '#0B1BFF'];

  displayedColumns: string[] = ['stt', 'name', 'count'];
  @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;
  dataSource: any;


  constructor(private dashboardService$: DashboardService,
              private activatedRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private elementRef: ElementRef) {
    this.dataSource = new MatTableDataSource([])
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
    this.loadData();
    this.title_country = COUNTRY();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //Lấy dữ liệu từ API
  loadData(): void {
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

      //Loại bản tin
      let arrayRecordField = res.filter((item: any) => item.name === 'record_field').map((item: any) => item.value)
      this.typeData = arrayRecordField[0]
      this.createChart(arrayRecordField[0])
    })
  }


  createChart(chartData:any): void {

    this.dataSource.data = chartData;
    this.title = chartData.map((item:any) => item.name);
    this.data = chartData.map((item:any) => item.count);
    // let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`)

    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: this.title,
        datasets: [
          {
            data: this.data,
            backgroundColor: this.backgroundColor,
          },

        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          colors: {
            forceOverride: true
          },
          datalabels: {
            font: {
              size: 14,
            },
            color: 'white',

            formatter: (value, context) => {
              const datapoint = context.dataset.data

              function totalSum(total: any, datapoint: any) {
                return total + datapoint
              }

              const totalValue = datapoint.reduce(totalSum, 0)
              const percentValue = (value / totalValue * 100).toFixed(1)
              return [`${percentValue}%`]
            }
          },
        },
      },
      //plugins: [ChartDataLabels],

    })

  }


}
