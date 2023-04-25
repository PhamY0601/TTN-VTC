import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-advertising-calendar-list',
  templateUrl: './advertising-calendar-list.component.html',
  styleUrls: ['./advertising-calendar-list.component.scss']
})
export class AdvertisingCalendarListComponent implements OnInit, AfterViewInit{

  data = [
    {
      id: 0,
      ward: 'Xã A',
      district: 'Huyện A',
      schedule: '14:30 24/02/2023',
      status: 'RS01',
      url: 'http://ics.vtctelecom.com.vn:5000/mediasource_01'
    },
    {
      id: 1,
      ward: 'Xã B',
      district: 'Huyện A',
      schedule: '14:30 24/02/2023',
      status: 'RS02',
      url: 'http://ics.vtctelecom.com.vn:5000/mediasource_02'
    },
    {
      id: 2,
      ward: 'Xã C',
      district: 'Huyện B',
      schedule: '14:30 24/02/2023',
      status: 'RS04',
      url: 'http://ics.vtctelecom.com.vn:5000/mediasource_03'
    },
    {
      id: 3,
      ward: 'Xã A',
      district: 'Huyện D',
      schedule: '14:30 24/02/2023',
      status: 'RS03',
      url: 'http://ics.vtctelecom.com.vn:5000/mediasource_04'
    },
    {
      id: 4,
      ward: 'Xã F',
      district: 'Huyện A',
      schedule: '14:30 24/02/2023',
      status: 'RS01',
      url: 'http://ics.vtctelecom.com.vn:5000/mediasource_05'
    },
    {
      id: 5,
      ward: 'Xã B',
      district: 'Huyện B',
      schedule: '14:30 24/02/2023',
      status: 'RS01',
      url: 'http://ics.vtctelecom.com.vn:5000/mediasource_06'
    },
  ]
  dataSource: any;
  @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumn: string[] = ['stt', 'ward', 'district','schedule', 'status', 'url', 'actions'];

  constructor() {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadData()

  }

  loadData() {
      this.dataSource.data = this.data;
  }
  // changedList() {
  //   this.eventSubscriber = this.eventManager.subscribe('radioManagerModified', () => this.loadData(COUNTRY()));
  // }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
