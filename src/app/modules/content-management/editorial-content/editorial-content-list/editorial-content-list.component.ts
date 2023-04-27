import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ContentManagementService} from "../../../../shared/services/content-management.service";

@Component({
  selector: 'app-editorial-content-list',
  templateUrl: './editorial-content-list.component.html',
  styleUrls: ['./editorial-content-list.component.scss']
})
export class EditorialContentListComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'date', 'radio-station', 'field', 'type', 'time', 'content', 'status'];
  dataSource: any;
  toDay = new Date();


  constructor(
    private contentManagementService$: ContentManagementService
  ) {
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
    this.contentManagementService$.getEditorialContent().subscribe((data) => {
      this.dataSource.data = data.body
    });
  }
}
