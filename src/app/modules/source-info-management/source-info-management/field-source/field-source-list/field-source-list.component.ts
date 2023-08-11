import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {NgxSpinnerService} from "ngx-spinner";
import {SourceInfoManagementService} from "../../../../../shared/services/source-info-management.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Clipboard} from '@angular/cdk/clipboard';

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
  dataDialog: any[] = []


  constructor( private spinner: NgxSpinnerService,
               public dialog: MatDialog,
               private sourceInfoService$: SourceInfoManagementService,
               private clipboard: Clipboard) {
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

  openDialog(id: any): void {
    this.sourceInfoService$.getFieldSource().subscribe((data) => {
      this.dataDialog = data.filter((item: any) => item.id === id);
      console.log( this.dataDialog[0].url)
      let dialogRef = this.dialog.open(AudioDialogComponent, {
        width: '500px',
        data: this.dataDialog[0].url,
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    })
  }




}

@Component({
  selector: 'audio-dialog-dialog',
  templateUrl: './audio-dialog.component.html',
})
export class AudioDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }


}

