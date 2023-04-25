import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-editorial-content',
  templateUrl: './editorial-content.component.html',
  styleUrls: ['./editorial-content.component.scss']
})
export class EditorialContentComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'date', 'radio-station', 'field', 'type', 'time', 'content', 'status'];
  dataSource: any;
  toDay = new Date();

  Data = [
    {
      id: 0,
      date: '22/04/2023',
      radio_station: 'Tỉnh',
      field: 'Chính trị',
      type: 'Media',
      time: '9:00-10:00',
      content: 'Nội dung',
      status: 1
    },
    {
      id: 1,
      date: '22/04/2023',
      radio_station: 'Huyện',
      field: 'Kinh tế',
      type: 'Media',
      time: '9:00-10:00',
      content: 'Nội dung',
      status: 1
    },
    {
      id: 2,
      date: '22/04/2023',
      radio_station: 'Tỉnh',
      field: 'Kinh tế',
      type: 'Âm thanh',
      time: '9:00-10:00',
      content: 'Nội dung',
      status: 0
    },
    {
      id: 3,
      date: '22/04/2023',
      radio_station: 'Xã',
      field: 'Chính trị',
      type: 'Media',
      time: '9:00-10:00',
      content: 'Nội dung',
      status: 0
    },
    {
      id: 4,
      date: '22/04/2023',
      radio_station: 'Tỉnh',
      field: 'Chính trị',
      type: 'Âm thanh',
      time: '9:00-10:00',
      content: 'Nội dung',
      status: 2
    },
    {
      id: 5,
      date: '22/04/2023',
      radio_station: 'Huyện',
      field: 'Chính trị',
      type: 'Âm thanh',
      time: '9:00-10:00',
      content: 'Nội dung',
      status: 0
    },
    {
      id: 0,
      date: '22/04/2023',
      radio_station: 'Xã',
      field: 'Kinh tế',
      type: 'Media',
      time: '9:00-10:00',
      content: 'Nội dung',
      status: 0
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
