import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import * as L from "leaflet";
import 'leaflet.markercluster';


@Component({
  selector: 'app-install',
  templateUrl: './install-management.component.html',
  styleUrls: ['./install-management.component.scss'],

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
  displayedColumn2: string[] = ['stt', 'city', 'district', 'ward', 'type', 'agencies', 'deviceId', 'createDate', 'position', 'status'];

  installDataChart: any[] = [];
  chart: any = [];
  backgroundColor = ['#2155CD', '#009EFF', '#00E7FF', '#00FFF6', '#0B1BFF'];

  private map: any;

  constructor(private citiesService$: CitiesService,
              private districtService$: DistrictService,
              private installationService$: InstallationService,
              private activatedRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private elementRef: ElementRef) {
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

    this.initMap()
    window.dispatchEvent(new Event("resize"));

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
      let arrayDeviceInstall = data.filter((item: any) => item.name === 'district_total').map((item: any) => item.value)
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

  createChart(chartData: any) {
    let title = chartData.map((item: any) => item.title)
    let value = chartData.map((item: any) => item.count)
    let htmlRefChart = this.elementRef.nativeElement.querySelector(`#install-chart`);

    this.chart = new Chart(htmlRefChart, {
      type: 'pie', data: {
        labels: title, datasets: [{
          data: value, backgroundColor: this.backgroundColor,
        },],
      }, options: {
        plugins: {
          legend: {
            position: 'bottom', labels: {
              boxWidth: 15, boxHeight: 15, padding: 50, font: {
                size: 14
              }
            }
          }, datalabels: {
            font: {
              size: 20,
            }, color: 'white',

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
      }, plugins: [ChartDataLabels]
    })

  }

  initMap(): void {
    let htmlRefMap = this.elementRef.nativeElement.querySelector(`#map`);
    this.map = L.map(htmlRefMap).setView([10.769444, 106.681944], 10);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    var markers = L.markerClusterGroup();

    this.installationService$.makeCapitalMarkers().subscribe((data: any) => {

      data.forEach((item: any) => {
        const marker = L.marker([item.Lat, item.Lng])
          .bindPopup(`<table>
                      <tr>
                        <th>Thiết bị</th>
                        <th>Nhà cung cấp</th>
                        <th>Tỉnh/Thành</th>
                        <th>Quận/Huyện</th>
                        <th>Xã/Phường</th>
                        <th>Trạng thái phát</th>
                      </tr>
                      <tr>
                        <td>${item.type_display}</td>
                        <td>${item.agencies_name}</td>
                        <td>${item.province}</td>
                        <td>${item.district}</td>
                        <td> ${item.ward}</td>
                        <td>${item.status_display}</td>
                      </tr>
                    </table>`)

        markers.addLayer(marker)
      })

    })
    this.map.addLayer(markers);
  }

  invalidateSize() {
    if (this.map) {
      setTimeout(() => {
        this.map.invalidateSize(true)
      }, 100);
    }
  }
}
