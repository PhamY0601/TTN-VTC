import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chart, Colors} from 'chart.js/auto'
import {CitiesService} from "../../../shared/services/cities.service";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {DashboardService} from "../../../shared/services/dashboard.service";

Chart.register(ChartDataLabels);
Chart.register(Colors);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})

export class PieChartComponent implements OnInit, OnChanges {

  @Input() recordFieldData: any[] = [];
  param?: string | null = '';
  title: any[] = [];
  data: any[] = [];
  newsData: any[] = [];
  chart: any = [];
  backgroundColor = ['#2155CD', '#009EFF', '#00E7FF', '#00FFF6', '#0B1BFF'];

  displayedColumns: string[] = ['stt', 'name', 'count'];
  dataSource: any;

  constructor(
    private citiesService$: CitiesService,
    private dashboardService$: DashboardService,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef
  ) {
    this.dataSource = new MatTableDataSource([])
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.param = params.get('district');
    });
    this.loadData()
  }

  //Phát hiện thay đổi của Input
  ngOnChanges(changes: SimpleChanges) {
    this.loadData()
  }

  loadData(): void {

      this.dataSource.data = this.recordFieldData;
      this.title = this.recordFieldData.map((item) => item.name);
      this.data = this.recordFieldData.map((item) => item.count);
      let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`)

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

    this.chart.destroy()
  }


}
