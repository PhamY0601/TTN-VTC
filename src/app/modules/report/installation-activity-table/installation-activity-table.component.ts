import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Chart} from 'chart.js/auto'
import {CitiesService} from "../../../shared/services/cities.service";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-installation-activity-table',
  templateUrl: './installation-activity-table.component.html',
  styleUrls: ['./installation-activity-table.component.scss']
})


export class InstallationActivityTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  dataSource: any;
  equipmentData = [
    {
      id: 0,
      district: 'Q.1',
      ward: 'Phường 3',
      type: 'Loa',
      count: 3,
      radionode: "ABC",
      action: 'Đã nghiệm thu'
    },

    {
      id: 1,
      district: 'Q.1',
      ward: 'Phường 4',
      type: 'Transmitter',
      count: 2,
      radionode: "ABC",
      action: 'Chưa nghiệm thu'
    },

    {
      id: 2,
      district: 'Q.Thủ Đức',
      ward: 'Phường 7',
      type: 'Loa',
      count: 6,
      radionode: "VTC",
      action: 'Chưa nghiệm thu'
    },

    {
      id: 3,
      district: 'Q.5',
      ward: 'Phường 3',
      type: 'Loa',
      count: 3,
      radionode: "VTC",
      action: 'Đã nghiệm thu'
    },

    {
      id: 4,
      district: 'Q.10',
      ward: 'Phường 3',
      type: 'Loa',
      count: 3,
      radionode: "VTC",
      action: 'Đã nghiệm thu'
    },
    {
      id: 5,
      district: 'Q.2',
      ward: 'Phường 3',
      type: 'Loa',
      count: 15,
      radionode: "VTC",
      action: 'Đã nghiệm thu'
    },
    {
      id: 6,
      district: 'Q.8',
      ward: 'Phường 3',
      type: 'Loa',
      count: 15,
      radionode: "VTC",
      action: 'Đã nghiệm thu'
    },

  ]
  displayedColumn: string[] = ['stt', 'district', 'ward', 'type', 'count', 'radionode', 'action'];

  chartbyplay: any = [];
  backgroundColor = ['#2155CD', '#009EFF', '#00E7FF', '#00FFF6', '#0B1BFF'];
  title: any[] = [];
  data: any[] = [];

  constructor(private citiesService$: CitiesService,
              private elementRef: ElementRef) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadData();
    this.chartByPlay()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loadData(): void {
    this.dataSource.data = this.equipmentData;
  }

  chartByPlay() {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
    this.chartbyplay = new Chart(htmlRef, {
      type: 'pie',
      data: {
        labels: ['Đã nghiệm thu', 'Chưa nghiệm thu'],
        datasets: [
          {
            data: [4, 3],
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
              const display = [`${percentValue}%`]
              return display
            }
          },
        },
      }
    })
  }

}
