import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-field-source',
  templateUrl: './field-source.component.html',
  styleUrls: ['./field-source.component.scss']
})

export class FieldSourceComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'name', 'type', 'schedule','url', 'listens', 'status'];
  dataSource: any;
  fieldData = [
    {
      "id": 0,
      "name": "Kinh tế",
      "type": "Phát thanh",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_ECO_12",
      "listens": 100,
      "status": "Chờ phát"
    },
    {
      "id": 1,
      "name": "Kinh tế",
      "type": "Media",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_POLI_85",
      "listens": 30,
      "status": "Đang phát"
    },
    {
      "id": 2,
      "name": "Chính trị",
      "type": "Media",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_POLI_74",
      "listens": 230,
      "status": "Đang phát"
    },
    {
      "id": 3,
      "name": "Kinh tế",
      "type": "Media",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_ECO_72",
      "listens": 100,
      "status": "Chờ phát"
    },
    {
      "id": 4,
      "name": "Kinh tế",
      "type": "Phát thanh",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_ECO_63",
      "listens": 100,
      "status": "Đang phát"
    },
    {
      "id": 5,
      "name": "Chính trị",
      "type": "Media",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_POLI_60",
      "listens": 100,
      "status": "Chờ phát"
    },
    {
      "id": 6,
      "name": "Chính trị",
      "type": "Media",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_POLI_85",
      "listens": 100,
      "status": "Đang phát"
    },
    {
      "id": 7,
      "name": "Kinh tế",
      "type": "Media",
      "url": "http://ics.vtctelecom.com.vn:5000/mediasource_ ECO_60",
      "listens": 100,
      "status": "Chờ phát"
    }
  ];
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
      this.dataSource.data = this.fieldData;
  }

}
