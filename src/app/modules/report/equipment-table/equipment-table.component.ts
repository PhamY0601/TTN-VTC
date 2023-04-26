import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Chart, Colors} from 'chart.js/auto'
import {CitiesService} from "../../../shared/services/cities.service";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-equipment-table',
  templateUrl: './equipment-table.component.html',
  styleUrls: ['./equipment-table.component.scss']
})


export class EquipmentTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  total_error = 0;
  total_success = 0;

  dataSource: any;
  equipmentData = [
    {
      id: 0,
      district: 'Q.1',
      ward: 'Phường 3',
      type: 'Loa',
      radionode: "VTC",
      error_count: 2,
      success_count: 10
    },

    {
      id: 2,
      district: 'Q.1',
      ward: 'Phường 4',
      type: 'Transmitter',
      radionode: "VTC",
      error_count: 8,
      success_count: 15
    },

    {
      id: 3,
      district: 'Q.Thủ Đức',
      ward: 'Phường 7',
      type: 'Loa',
      radionode: "VTC",
      error_count: 5,
      success_count: 14
    },

    {
      id: 4,
      district: 'Q.5',
      ward: 'Phường 3',
      type: 'Loa',
      radionode: "VTC",
      error_count: 1,
      success_count: 16

    },

    {
      id: 5,
      district: 'Q.10',
      ward: 'Phường 3',
      type: 'Loa',
      radionode: "VTC",
      error_count: 9,
      success_count: 25
    },
    {
      id: 6,
      district: 'Q.2',
      ward: 'Phường 3',
      type: 'Loa',
      radionode: "VTC",
      error_count: 5,
      success_count: 10
    },
    {
      id: 6,
      district: 'Q.4',
      ward: 'Phường 3',
      type: 'Loa',
      radionode: "VTC",
      error_count: 5,
      success_count: 14
    },

  ]
  displayedColumn: string[] = ['stt', 'district', 'ward', 'type', 'count', 'radionode', 'action'];

  chartbyplay: any = [];
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
    this.equipmentData.forEach((item:any) => {
      this.total_error = this.total_error + item.error_count;
      this.total_success = this.total_success + item.success_count;

    })

    let array = [];
    array.push(this.total_success, this.total_error)
    let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
    this.chartbyplay = new Chart(htmlRef, {
      type: 'pie',
      data: {
        labels: ['Tốt', 'Lỗi'],
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
              const display = [`${percentValue}%`]
              return display
            }
          },
        },
      }
    })
  }

}
