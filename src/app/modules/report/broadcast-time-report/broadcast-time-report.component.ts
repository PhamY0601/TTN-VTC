import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CitiesService} from "../../../shared/services/cities.service";
import {COUNTRY} from "../../../app.constants";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-broadcast-time-report',
  templateUrl: './broadcast-time-report.component.html',
  styleUrls: ['./broadcast-time-report.component.scss']
})
export class BroadcastTimeReportComponent implements OnInit, AfterViewInit {
  districtsData: any[] = [];
  wardsData: any[] = [];
  showTable: boolean = false;
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
  toDay = new Date();
  beforeDay = new Date();

  dataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumn: string[] =
    ['stt', 'station', 'speaker', 'area', 'location', 'news', 'urgent_bulletin', 'play_time', 'request_duration', 'ratio'];

  constructor(private citiesService$: CitiesService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.getDistrict(COUNTRY());
    this.loadData();
    this.beforeDay.setDate(this.beforeDay.getDate()-15);
  }

  getDistrict(city: any) {
    this.citiesService$.getDistricts(city).subscribe((data) => {
      this.districtsData = data;
    })
  }

  districtEffect(event: any): void {
    this.wardsData = [];
    this.citiesService$.getWards(event.value).subscribe((data) => {
      this.wardsData = data
    })
  }

  loadData() {
    this.dataSource.data = this.broadcastData
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  calculateRatio (a:number, b: number) {
    return ((a/b)*100).toFixed(0);
  }
}
