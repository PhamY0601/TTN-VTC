import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-registration-content',
  templateUrl: './registration-content.component.html',
  styleUrls: ['./registration-content.component.scss']
})
export class RegistrationContentComponent  implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'date', 'station', 'area','time', 'url', 'content'];
  dataSource: any;
  toDay = new Date();
  Data = [
    {
      id: 0,
      date: '22/04/2023',
      station: 'Trạm 1',
      district: 'Huyện A',
      ward: 'Xã A',
      time: '9:00-10:00',
      content: 'Cấp huyện',
      url: 'http://ics.vtctelecom.com.vn:5000/content',
      time_slot: [
        {
          time: '9:00-9:15',
          content: 'Tiếp âm đài huyện A',
        },
        {
          time: '9:15-9:45',
          content: 'Nội dung tự biên tập',
        },
        {
          time: '9:45-10:00',
          content: 'Tiếp âm đài tỉnh lĩnh vực',
        },
      ]
    },
    {
      id: 1,
      date: '23/04/2023',
      station: 'Trạm 2',
      district: 'Huyện B',
      ward: 'Xã B',
      time: '9:00-10:00',
      content: 'Cấp huyện',
      url: 'http://ics.vtctelecom.com.vn:5000/content',
      time_slot: [
        {
          time: '9:00-9:15',
          content: 'Tiếp âm đài huyện A',
        },
        {
          time: '9:15-9:45',
          content: 'Nội dung tự biên tập',
        },
        {
          time: '9:45-10:00',
          content: 'Tiếp âm đài tỉnh lĩnh vực',
        },
      ]
    },
    {
      id: 2,
      date: '24/04/2023',
      station: 'Trạm 3',
      district: 'Huyện C',
      ward: 'Xã C',
      time: '9:00-10:00',
      content: 'Cấp xã',
      url: 'http://ics.vtctelecom.com.vn:5000/content',
      time_slot: [
        {
          time: '9:00-9:15',
          content: 'Tiếp âm đài huyện A',
        },
        {
          time: '9:15-9:45',
          content: 'Nội dung tự biên tập',
        },
        {
          time: '9:45-10:00',
          content: 'Tiếp âm đài tỉnh lĩnh vực',
        },
      ]
    },
    {
      id: 3,
      date: '20/04/2023',
      station: 'Trạm 4',
      district: 'Huyện A',
      ward: 'Xã C',
      time: '9:00-10:00',
      content: 'Cấp huyện',
      url: 'http://ics.vtctelecom.com.vn:5000/content',
      time_slot: [
        {
          time: '9:00-9:15',
          content: 'Tiếp âm đài huyện A',
        },
        {
          time: '9:15-9:45',
          content: 'Nội dung tự biên tập',
        },
        {
          time: '9:45-10:00',
          content: 'Tiếp âm đài tỉnh lĩnh vực',
        },
      ]
    },
    {
      id: 4,
      date: '22/04/2023',
      station: 'Trạm 6',
      district: 'Huyện B',
      ward: 'Xã A',
      time: '9:00-10:00',
      content: 'Cấp huyện',
      url: 'http://ics.vtctelecom.com.vn:5000/content',
      time_slot: [
        {
          time: '9:00-9:15',
          content: 'Tiếp âm đài huyện A',
        },
        {
          time: '9:15-9:45',
          content: 'Nội dung tự biên tập',
        },
        {
          time: '9:45-10:00',
          content: 'Tiếp âm đài tỉnh lĩnh vực',
        },
      ]
    },
  ]

  constructor() {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.dataSource.data = this.Data;
  }
}
