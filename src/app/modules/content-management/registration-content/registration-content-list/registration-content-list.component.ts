import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ContentManagementService} from "../../../../shared/services/content-management.service";

@Component({
  selector: 'app-registration-content',
  templateUrl: './registration-content-list.component.html',
  styleUrls: ['./registration-content-list.component.scss']
})
export class RegistrationContentListComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'date', 'station', 'area', 'type', 'time', 'url', 'content'];
  dataSource: any;
  toDay = new Date();

  constructor(
    private contentManagementService$: ContentManagementService
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.contentManagementService$.getRegistrationContent().subscribe((data) => {
      this.dataSource.data = data.body
    });
  }
}
