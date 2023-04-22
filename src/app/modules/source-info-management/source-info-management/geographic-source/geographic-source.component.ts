import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CitiesService} from "../../../../shared/services/cities.service";
import {MatSort} from "@angular/material/sort";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-geographic-source',
  templateUrl: './geographic-source.component.html',
  styleUrls: ['./geographic-source.component.scss']
})
export class GeographicSourceComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'district', 'type','schedule', 'url', 'listens', 'status'];
  dataSource: any;
  geographicData = [
    {
      "id": 0,
      "district": "Bá Thước",
      "type": "Phát thanh",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_12",
      "listens": 100,
      "status": "Chờ phát"
    },
    {
      "id": 1,
      "district": "Cẩm Thủy",
      "type": "Phát thanh",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_74",
      "listens": 100,
      "status": "Chờ phát"
    },
    {
      "id": 2,
      "district": "Đông Sơn",
      "type": "Phát thanh",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_33",
      "listens": 100,
      "status": "Đang phát"
    },
    {
      "id": 3,
      "district": "Hà Trung",
      "type": "Phát thanh",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_64",
      "listens": 100,
      "status": "Chờ phát"
    },
    {
      "id": 4,
      "district": "Hậu Lộc",
      "type": "Phát thanh",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_52",
      "listens": 100,
      "status": "Chờ phát"
    },
    {
      "id": 5,
      "district": "Hoằng Hóa",
      "type": "Phát thanh",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_62",
      "listens": 100,
      "status": "Chờ phát"
    },
    {
      "id": 6,
      "district": "Lang Chánh",
      "type": "Phát thanh",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_20",
      "listens": 100,
      "status": "Đang phát"
    },
    {
      "id": 7,
      "district": "Nga Sơn",
      "type": "Phát thanh",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_42",
      "listens": 100,
      "status": "Đang phát"
    },
    {
      "id": 8,
      "district": "Ngọc Lặc",
      "type": "Phát thanh",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_71",
      "listens": 100,
      "status": "Chờ phát"
    }
  ]
  constructor( private spinner: NgxSpinnerService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadData(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.dataSource.data = this.geographicData;
  }
}
