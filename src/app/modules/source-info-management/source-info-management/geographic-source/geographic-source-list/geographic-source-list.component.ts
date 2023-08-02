import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CitiesService} from "../../../../../shared/services/cities.service";
import {MatSort} from "@angular/material/sort";
import {NgxSpinnerService} from "ngx-spinner";
import {SourceInfoManagementService} from "../../../../../shared/services/source-info-management.service";
import {AudioDialogComponent} from "../../field-source/field-source-list/field-source-list.component";
import {MatDialog} from "@angular/material/dialog";

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
  dataDialog: any[] = []
  constructor( private spinner: NgxSpinnerService,
               public dialog: MatDialog,
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
      this.dataSource.data = data
    });
  }

  openDialog(id: any): void {
    this.sourceInfoService$.getGeographicSource().subscribe((res) => {

      this.dataDialog =  Object.values(res).filter((item: any) => item.id === id);
      let dialogRef = this.dialog.open(AudioDialogComponent, {
        width: '500px',
        data: this.dataDialog[0].url,
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    })
  }
}
