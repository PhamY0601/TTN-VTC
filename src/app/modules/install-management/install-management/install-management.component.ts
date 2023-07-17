import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from "@angular/material/paginator";
import {CitiesService} from "../../../shared/services/cities.service";
import {ActivatedRoute} from "@angular/router";
import {DistrictService} from "../../../shared/services/district.service";
import {COUNTRY} from "../../../app.constants";
import {NgxSpinnerService} from "ngx-spinner";
import {InstallationService} from "../../../shared/services/installation.service";
import {Chart} from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: 'app-install-management',
  templateUrl: './install-management.component.html',
  styleUrls: ['./install-management.component.scss']
})
export class InstallManagementComponent implements OnInit, OnDestroy, AfterViewInit {

  display: boolean = true;
  param?: string | null = '';
  dataSourceFirst: any;
  @ViewChild('paginatorFirst', {static: true}) paginatorFirst!: MatPaginator;
  @ViewChild('tableFirstSort') tableFirstSort!: MatSort;
  displayedColumn1: string[] = ['stt', 'district', 'speaker', 'video', 'transmitter'];


  dataSourceSecond: any;
  @ViewChild('paginatorSecond', {static: true}) paginatorSecond!: MatPaginator;
  @ViewChild('tableSecondSort') tableSecondSort!: MatSort;
  displayedColumn2: string[] = ['stt', 'city', 'district', 'ward', 'type', 'agencies','deviceId', 'agencies','createDate', 'position', 'status'];

  installDataChart: any[] = [];
  chart: any = [];
  backgroundColor = ['#2155CD', '#009EFF', '#00E7FF', '#00FFF6', '#0B1BFF'];


  constructor(private citiesService$: CitiesService,
              private districtService$: DistrictService,
              private installationService$: InstallationService,
              private activatedRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,) {
    this.dataSourceFirst = new MatTableDataSource([]);
    this.dataSourceSecond = new MatTableDataSource([]);
  }

  ngOnInit() {

    this.loadData(COUNTRY());


  }

  ngAfterViewInit() {

    this.dataSourceFirst.paginator = this.paginatorFirst;
    this.dataSourceFirst.sort = this.tableFirstSort;

    this.dataSourceSecond.paginator = this.paginatorSecond;
    this.dataSourceSecond.sort = this.tableSecondSort;
  }

  ngOnDestroy() {
  }


  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSecond.filter = filterValue.trim().toLowerCase();
  }

  loadData(_COUNTRY: any): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);

    this.installationService$.getInstall().subscribe((data) => {
      let arrayDeviceInstall = data.filter((item: any) => item.name === 'device_install').map((item: any) => item.value)
      this.dataSourceFirst.data = arrayDeviceInstall[0];

      let arrayDevicePositions = data.filter((item: any) => item.name === 'device_positions').map((item: any) => item.value)

      arrayDevicePositions[0].sort((item1: any, item2: any) => {
        let date1: any = new Date(item1.date);
        let date2: any = new Date(item2.date);
        return date2 - date1;
      });
      this.dataSourceSecond.data = arrayDevicePositions[0];

      let arrayDeviceTotal = data.filter((item: any) => item.name === 'device_total').map((item: any) => item.value)
      this.createChart(arrayDeviceTotal[0])

    });

  }

  createChart(chartData:any)  {
    console.log(chartData)
    let title = chartData.map((item:any) => item.title)
    let value = chartData.map((item:any) => item.count)


    this.chart = new Chart('install-chart', {
      type: 'pie',
      data: {
        labels: title,
        datasets: [
          {
            data: value,
            backgroundColor: this.backgroundColor,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 15,
              boxHeight: 15,
              padding: 50,
              font: {
                size: 14
              }
            }
          },
          datalabels: {
            font: {
              size: 20,
            },
            color: 'white',

            formatter: (value,context) => {
              const datapoint = context.dataset.data
              function totalSum (total:any,datapoint:any) {
                return total + datapoint
              }
              const totalValue = datapoint.reduce(totalSum,0)
              const percentValue = (value/totalValue *100).toFixed(1)
              return [`${percentValue}%`]
            }
          },

        },
      },
       plugins: [ChartDataLabels]
    })

  }

}

