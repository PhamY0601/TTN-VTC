import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Chart} from "chart.js/auto";
import {NgxSpinnerService} from "ngx-spinner";
import {LocationsService} from "../../../shared/services/locations.service";

@Component({
  selector: 'app-broadcast-time-report',
  templateUrl: './broadcast-time-report.component.html',
  styleUrls: ['./broadcast-time-report.component.scss']
})
export class BroadcastTimeReportComponent implements OnInit, AfterViewInit {
  districtsData: any[] = [];
  wardsData: any[] = [];

  display: boolean = false;
  broadcastData = [
    {
      id: 0,
      station: '001',
      speaker: 30,
      district: 'Bá Thước',
      ward: 'Càng Nàng',
      latitude: '19.867396',
      longitude: '105.7271',
      total: 59,
      play_successful: 30,
      urgent_bulletin: 20,
      play_time: 2650,
      request_duration: 3600
    },
    {
      id: 1,
      station: '002',
      speaker: 45,
      district: 'Bá Thước',
      ward: 'Cẩm Thủy',
      latitude: '19.867396',
      longitude: '105.7271',
      total: 89,
      play_successful: 20,
      urgent_bulletin: 10,
      play_time: 2050,
      request_duration: 7200
    },
    {
      id: 2,
      station: '003',
      speaker: 10,
      district: 'Bá Thước',
      ward: 'Điền Hạ',
      latitude: '19.867396',
      longitude: '105.7271',
      total: 79,
      play_successful: 22,
      urgent_bulletin: 34,
      play_time: 1650,
      request_duration: 3600
    },
    {
      id: 3,
      station: '004',
      speaker: 80,
      district: 'Bá Thước',
      ward: 'Điền Hạ',
      latitude: '19.867396',
      longitude: '105.7271',
      total: 109,
      play_successful: 47,
      urgent_bulletin: 52,
      play_time: 1523,
      request_duration: 2600
    },
    {
      id: 4,
      station: '005',
      speaker: 67,
      district: 'Lương Ngoại',
      ward: 'Càng Nàng',
      latitude: '19.867396',
      longitude: '105.7271',
      total: 143,
      play_successful: 40,
      urgent_bulletin: 56,
      play_time: 2673,
      request_duration: 3200
    },
    {
      id: 5,
      station: '006',
      speaker: 30,
      district: 'Bá Thước',
      ward: 'Lương Nội',
      latitude: '19.867396',
      longitude: '105.7271',
      total: 109,
      play_successful: 30,
      urgent_bulletin: 20,
      play_time: 1800,
      request_duration: 3600
    },
    {
      id: 6,
      station: '007',
      speaker: 30,
      district: 'Bá Thước',
      ward: 'Thành Lâm',
      latitude: '19.867396',
      longitude: '105.7271',
      total: 89,
      play_successful: 34,
      urgent_bulletin: 23,
      play_time: 1600,
      request_duration: 3600
    },
    {
      id: 7,
      station: '008',
      speaker: 30,
      district: 'Bá Thước',
      ward: 'Kỳ Tân',
      latitude: '19.867396',
      longitude: '105.7271',
      total: 72,
      play_successful: 30,
      urgent_bulletin: 20,
      play_time: 3400,
      request_duration: 3600
    },
    {
      id: 8,
      station: '009',
      speaker: 30,
      district: 'Bá Thước',
      ward: 'Văn Nho',
      latitude: '19.867396',
      longitude: '105.7271',
      total: 50,
      play_successful: 30,
      urgent_bulletin: 20,
      play_time: 2650,
      request_duration: 3600
    },
    {
      id: 9,
      station: '010',
      speaker: 30,
      district: 'Bá Thước',
      ward: 'Cỗ Lủng',
      latitude: '19.867396',
      longitude: '105.7271',
      total: 52,
      play_successful: 30,
      urgent_bulletin: 49,
      play_time: 2650,
      request_duration: 3600
    },
    {
      id: 10,
      station: '011',
      speaker: 230,
      district: 'Bá Thước',
      ward: 'Ái Thượng',
      latitude: '19.867396',
      longitude: '105.7271',
      total: 203,
      play_successful: 30,
      urgent_bulletin: 20,
      play_time: 2650,
      request_duration: 3600
    },
  ];
  today = new Date();
  beforeDay = new Date();

  chartByPlaySuccess: any = [];
  chartByUrgentBulletin: any = [];
  chartByTime: any = [];
  title: any[] = [];
  data: any[] = [];


  dataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumn: string[] =
    ['stt', 'station', 'speaker', 'area', 'location', 'news', 'urgent_bulletin', 'play_time', 'request_duration', 'ratio'];

  constructor(private elementRef: ElementRef,
              private locationsService$: LocationsService,
              private spinner: NgxSpinnerService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.beforeDay.setDate(this.beforeDay.getDate() - 15);
    this.loadData();
    this.chartSuccess();
    this.chartUrgentBulletin();
    this.chartTime();
    this.getDistrict();
  }

  getDistrict() {
    this.locationsService$.getLocations().subscribe((data) => {
      data[0].children.forEach((district:any) => {
        this.districtsData.push({
          code: district.Code,
          name: district.Name,
        })
      })

    })
  }

  districtEffect(code: any): void {
    this.wardsData = [];
    this.getWard(code)
  }

  getWard(code:any):void {
    this.locationsService$.getLocations().subscribe((data) => {
      data[0].children.forEach((district:any) => {
        if(district.Code === code) {
          district.children.forEach((ward:any) => {
            this.wardsData.push({
              code: ward.Code,
              name: ward.Name,
            })
          })

        }
      })

    })
  }

  loadData() {
    this.dataSource.data = this.broadcastData;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  calculateRatio(a: number, b: number) {
    return ((a / b) * 100).toFixed(0);
  }

  chartSuccess() {
    let totalSuccess = 0;
    let total = 0;

    this.broadcastData.forEach((item: any) => {
      total = total + item.total;
      totalSuccess = totalSuccess + item.play_successful;
    })

    let totalOrther = 0;
    totalOrther = total - totalSuccess

    let array = [];
    array.push(totalSuccess,totalOrther)
    let htmlRef = this.elementRef.nativeElement.querySelector(`#canvasFrist`);
    this.chartByPlaySuccess = new Chart(htmlRef, {
      type: 'pie',
      data: {
        labels: ['Phát thành công', 'Bản tin khác'],
        datasets: [
          {
            data: array,
            backgroundColor: ['#02C94F', '#D9D9D9'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 20,
              boxHeight: 20,
              padding: 30,
              font: {
                size: 16
              }
            }
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
      }
    })
  }

  chartUrgentBulletin() {
    let totalUrgentBulletin = 0;
    let total = 0;
    this.broadcastData.forEach((item: any) => {
      total = total + item.total;
      totalUrgentBulletin = totalUrgentBulletin + item.urgent_bulletin;
    })
    let totalOrther = 0;
    totalOrther = total - totalUrgentBulletin

    let array = [];
    array.push(totalUrgentBulletin, totalOrther)
    let htmlRef = this.elementRef.nativeElement.querySelector(`#canvasSecond`);
    this.chartByUrgentBulletin = new Chart(htmlRef, {
      type: 'pie',
      data: {
        labels: ['Bản tin khẩn cấp', 'Bản tin khác'],
        datasets: [
          {
            data: array,
            backgroundColor: ['#02C94F', '#D9D9D9'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 20,
              boxHeight: 20,
              padding: 30,
              font: {
                size: 16
              }
            }
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
      }
    })
  }

  chartTime() {
    let totalTime = 0;
    let total = 0;
    this.broadcastData.forEach((item: any) => {
      total = total + item.request_duration;
      totalTime = totalTime + item.play_time;
    })
    let totalOrther = 0;
    totalOrther = total - totalTime

    let array = [];
    array.push(totalTime, totalOrther)
    let htmlRef = this.elementRef.nativeElement.querySelector(`#canvasThird`);
    this.chartByTime = new Chart(htmlRef, {
      type: 'pie',
      data: {
        labels: ['Thời gian phát', 'Thời gian còn lại'],
        datasets: [
          {
            data: array,
            backgroundColor: ['#02C94F', '#D9D9D9'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 20,
              boxHeight: 20,
              padding: 30,
              font: {
                size: 16
              }
            }
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
      }
    })
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
