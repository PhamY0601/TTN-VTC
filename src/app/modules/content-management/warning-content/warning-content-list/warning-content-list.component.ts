import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NgxSpinnerService} from "ngx-spinner";
import {MatTableDataSource} from "@angular/material/table";
import {ContentManagementService} from "../../../../shared/services/content-management.service";

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
    this.contentManagementService$.getWarningContent().subscribe((data) => {
      this.dataSource.data = data.body
      console.log(data.body)
    });
  }
}
