import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {NgxSpinnerService} from "ngx-spinner";
import {SourceInfoManagementService} from "../../../../../shared/services/source-info-management.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  AreaDialogComponent
} from "../../../../emergency-broadcasting/emergency-broadcasting-list/emergency-broadcasting-list.component";

@Component({
  selector: 'app-field-source',
  templateUrl: './field-source-list.component.html',
  styleUrls: ['./field-source-list.component.scss']
})

export class FieldSourceListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'name', 'type', 'schedule','url', 'listens', 'status'];
  dataSource: any;

  constructor( private spinner: NgxSpinnerService,
               public dialog: MatDialog,
               private sourceInfoService$: SourceInfoManagementService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadData();

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
      this.sourceInfoService$.getFieldSource().subscribe((data) => {
        this.dataSource.data = data
    });
  }




}
