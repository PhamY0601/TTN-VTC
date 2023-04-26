import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {CitiesService} from "../../../shared/services/cities.service";
import {DistrictService} from "../../../shared/services/district.service";
import {ActivatedRoute} from "@angular/router";
import {COUNTRY} from "../../../app.constants";

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-install-management-chart',
  templateUrl: './install-management-chart.component.html',
  styleUrls: ['./install-management-chart.component.scss']
})
export class InstallManagementChartComponent implements OnInit {
  chart: any = [];
  backgroundColor = ['#02C94F', '#D9D9D9'];
  installData: any[] = []
  param?: string | null = '';

  constructor(private citiesService$: CitiesService,
              private districtService$: DistrictService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.param = params.get('district');
    });
    this.loadData(COUNTRY())
  }

  loadData(_COUNTRY:any): void {
    if (this.param !== null) {
      this.districtService$.getDeviceStatus(_COUNTRY,this.param).subscribe((data) => {
        this.installData = data;
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
                  boxWidth: 20,
                  boxHeight: 20,
                  padding: 50,
                  font: {
                    size: 16
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
                  const display = [`${percentValue}%`]
                  return display
                }
              },

            },
          },
          plugins: [ChartDataLabels]
        })
      });
    } else {
      this.citiesService$.getDeviceStatus(_COUNTRY).subscribe((data) => {
        this.installData = data;
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
                  boxWidth: 20,
                  boxHeight: 20,
                  padding: 50,
                  font: {
                    size: 16
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
                  const display = [`${percentValue}%`]
                  return display
                }
              },

            },
          },
          plugins: [ChartDataLabels]
        })
      })
    }



  }

}
