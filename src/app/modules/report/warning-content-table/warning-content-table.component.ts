import {AfterViewInit, Component,  OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-warning-content-table',
  templateUrl: './warning-content-table.component.html',
  styleUrls: ['./warning-content-table.component.scss']
})
export class WarningContentTableComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: any;

  displayedColumn: string[] = ['stt', 'date', 'time', 'station', 'area', 'news', 'keywords', 'record'];

  warningContentData = [
    {
      id: 0,
      date: '1624957832',
      station: 'Trạm 1',
      district: 'Huyện Quan Sơn',
      ward: 'Thị trấn Sơn Lư',
      news: 'Bản tin 1',
      keywords: ['bieu tinh', 'ca cuoc', 'chich hut'],
      record: ''
    },
    {
      id: 1,
      date: '1624957832',
      station: 'Trạm 2',
      district: 'Huyện Hoằng Hóa',
      ward: 'Huyện Hoằng Hóa',
      news: 'Bản tin 2',
      keywords:  ['bieu tinh', 'ca cuoc', 'chich hut', 'ban tre em'],
      record: ''
    },
    {
      id: 2,
      date: '1624957832',
      station: 'Trạm 3',
      district: 'Huyện Thiệu Hóa',
      ward: 'Huyện Thiệu Hóa',
      news: 'Bản tin 3',
      keywords: [ 'ca cuoc', 'chich hut', 'ban tre em'],
      record: ''
    },
    {
      id: 3,
      date: '1624957832',
      station: 'Trạm 4',
      district: 'Huyện Hoằng Hóa',
      ward: 'Xã Hoằng Tiến',
      news: 'Bản tin 3',
      keywords:   ['ca cuoc', 'chich hut'],
      record: ''
    },
    {
      id: 4,
      date: '1624957832',
      station: 'Trạm 2',
      district: 'H. Hà Trung',
      ward: 'Xã Hà Lĩnh',
      news: 'Bản tin 1',
      keywords: [ 'ca cuoc', 'chich hut', 'ban tre em'],
      record: ''
    },
    {
      id: 5,
      date: '1624957832',
      station: 'Trạm 3',
      district: 'TP. Thanh Hóa',
      ward: 'Phường An Hoạch',
      news: 'Bản tin 1',
      keywords: [ 'ca cuoc', 'chich hut', 'ban tre em'],
      record: ''
    },
  ]


  constructor() {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadData();


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loadData(): void {
    this.dataSource.data = this.warningContentData;
  }




}
