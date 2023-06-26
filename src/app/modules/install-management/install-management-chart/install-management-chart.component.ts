import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chart} from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {ActivatedRoute} from "@angular/router";
import {COUNTRY} from "../../../app.constants";


Chart.register(ChartDataLabels);

@Component({
  selector: 'app-install-management-chart',
  templateUrl: './install-management-chart.component.html',
  styleUrls: ['./install-management-chart.component.scss']
})
export class InstallManagementChartComponent implements OnInit, OnChanges {
  @Input() installData: any[] = []

  chart: any = [];
  backgroundColor = ['#2155CD', '#009EFF', '#00E7FF', '#00FFF6', '#0B1BFF'];
  param?: string | null = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.param = params.get('district');
    });
    this.loadData()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadData()
  }

  loadData(): void {

        let title = this.installData.map((item) => item.title)
        let value = this.installData.map((item) => item.count)

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
