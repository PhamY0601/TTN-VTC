import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CitiesService} from "../../../../../shared/services/cities.service";
import {MatSort} from "@angular/material/sort";
import {NgxSpinnerService} from "ngx-spinner";
import {SourceInfoManagementService} from "../../../../../shared/services/source-info-management.service";

@Component({
  selector: 'app-geographic-source',
  templateUrl: './geographic-source-list.component.html',
  styleUrls: ['./geographic-source-list.component.scss']
})
export class GeographicSourceListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'province', 'district', 'ward', 'type','schedule', 'url', 'listens', 'status'];
  dataSource: any;

  constructor( private spinner: NgxSpinnerService,
               private sourceInfoService$: SourceInfoManagementService) {
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
    this.sourceInfoService$.getGeographicSource().subscribe((data) => {
      console.log(data)
      this.dataSource.data = data
    });
  }
}
