import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Chart} from 'chart.js/auto'
import {CitiesService} from "../../../shared/services/cities.service";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-media-table',
  templateUrl: './media-table.component.html',
  styleUrls: ['./media-table.component.scss']
})


export class MediaTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  dataSource: any;
  radioStreamData = [
    {
      id: 0,
      district: 'Q.1',
      type: 'Kinh tế',
      count: 3,
      radionode: 4,
      play_successful: 5
    },
    {
      id: 1,
      district: 'Q.2',
      type: 'Chính trị',
      count: 2,
      radionode: 5,
      play_successful: 1
    },
    {
      id: 2,
      district: 'Q.3',
      type: 'Chính trị',
      count: 2,
      radionode: 5,
      play_successful: 2
    },
    {
      id: 3,
      district: 'Q.1',
      type: 'Chính trị',
      count: 2,
      radionode: 4,
      play_successful: 6
    },
    {
      id: 4,
      district: 'Q.Thủ Đức',
      type: 'Kinh tế',
      count: 7,
      radionode: 1,
      play_successful: 10
    },
    {
      id: 5,
      district: 'Q.10',
      type: 'Kinh tế',
      count: 31,
      radionode: 5,
      play_successful: 9
    }, {
      id: 6,
      district: 'Q.9',
      type: 'Chính trị',
      count: 3,
      radionode: 4,
      play_successful: 5
    },
    {
      id: 7,
      district: 'Q.7',
      type: 'Kinh tế',
      count: 3,
      radionode: 5,
      play_successful: 5
    },
  ]
  totalCount?: number;
  totalRadionode?: number;
  totalPlaySuccess?:number;
  displayedColumn: string[] = ['stt', 'district', 'type', 'count', 'radionode', 'play_successful'];

  chartbyfield: any = [];
  chartbyplay: any = [];
  backgroundColor = ['#2155CD', '#009EFF', '#00E7FF', '#00FFF6', '#0B1BFF'];
  title: any[] = [];
  newsData: any[] = [];
   data: any[] = [];

  constructor( private citiesService$: CitiesService,
               private elementRef: ElementRef) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadData();
    this.calculateTotal();
    this.chartByField();
    this.chartByPlay()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loadData(): void {
    this.dataSource.data = this.radioStreamData;
  }

  calculateTotal() {
    this.totalCount = 0;
    this.totalRadionode = 0;
    this.totalPlaySuccess = 0;

    for (let i = 0; i < this.dataSource.data.length; i++) {
      this.totalCount += this.dataSource.data[i].count;
      this.totalRadionode += this.dataSource.data[i].radionode;
      this.totalPlaySuccess += this.dataSource.data[i].play_successful
    }
  }

  chartByField() {
    this.citiesService$.getPlayStreams().subscribe((data: any) => {
      this.newsData = data;
      this.title = this.newsData.map((item) => item.name);
      this.data = this.newsData.map((item) => item.count);
      let htmlRef = this.elementRef.nativeElement.querySelector(`#canvasbyfield`);
      this.chartbyfield = new Chart(htmlRef, {
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
              position: 'right',
              labels: {
                boxWidth: 10,
                boxHeight: 10,
                padding: 10,
                font: {
                  size: 13
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

    })
  }

  chartByPlay() {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
    this.chartbyplay = new Chart(htmlRef, {
      type: 'pie',
      data: {
        labels: ['Thành công', 'Không thành công'],
        datasets: [
          {
            data: [104, 20],
            backgroundColor: ['#02C94F', '#D9D9D9'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              padding: 10,
              font: {
                size: 13
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
