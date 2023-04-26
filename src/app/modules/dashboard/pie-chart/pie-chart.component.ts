import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Chart, Colors} from 'chart.js/auto'
import {CitiesService} from "../../../shared/services/cities.service";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";

Chart.register(ChartDataLabels);
Chart.register(Colors);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})

export class PieChartComponent implements OnInit {

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
    private activatedRoute: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource([])
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.param = params.get('district');
    });
    this.loadData()
  }

  loadData(): void {
    this.citiesService$.getPlayStreams().subscribe((data: any) => {
      this.newsData = data;
      this.dataSource.data = data;
      this.title = this.newsData.map((item) => item.name);
      this.data = this.newsData.map((item) => item.count);
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
                const display = [`${percentValue}%`]
                return display
              }
            },
          },
        }
      })
    })
  }


}
