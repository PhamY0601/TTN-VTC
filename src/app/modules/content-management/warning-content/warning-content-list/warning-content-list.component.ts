import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NgxSpinnerService} from "ngx-spinner";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-warning-content-list',
  templateUrl: './warning-content-list.component.html',
  styleUrls: ['./warning-content-list.component.scss']
})
export class WarningContentListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'keyword', 'warning_content', 'method','warning_level', 'receiver', 'action'];
  dataSource: any;

  warningData = [
    {
      id: 0,
      keyword: 'Từ khóa 1',
      warning_content: 'Nội dung 1',
      warning_level: 'Mức 1',
      pause: false,
      method: 'SMS',
      receiver: 'Cấp huyện'
    },
    {
      id: 1,
      keyword: 'Từ khóa 2',
      warning_content: 'Nội dung 2',
      warning_level: 'Mức 2',
      pause: false,
      method: 'Email',
      receiver: 'Cấp xã'
    },
    {
      id: 2,
      keyword: 'Từ khóa 3',
      warning_content: 'Nội dung 3',
      warning_level: 'Mức 3',
      pause: false,
      method: 'Email',
      receiver: 'Cấp huyện'
    },
    {
      id: 3,
      keyword: 'Từ khóa 4',
      warning_content: 'Nội dung 4',
      warning_level: 'Mức 4',
      pause: true,
      method: 'SMS',
      receiver: 'Cấp xã'
    },
    {
      id: 4,
      keyword: 'Từ khóa 5',
      warning_content: 'Nội dung 5',
      warning_level: 'Mức 1',
      pause: false,
      method: 'Email',
      receiver: 'Cấp huyện'
    }, {
      id: 5,
      keyword: 'Từ khóa 6',
      warning_content: 'Nội dung 6',
      warning_level: 'Mức 2',
      pause: false,
      method: 'SMS',
      receiver: 'Cấp huyện'
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
    this.dataSource.data = this.warningData;
  }
}
