import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {SourceInfoManagementService} from "../../../shared/services/source-info-management.service";
import {EmergencyBroadcastingService} from "../../../shared/services/emergency-broadcasting.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-emergency-broadcasting-list',
  templateUrl: './emergency-broadcasting-list.component.html',
  styleUrls: ['./emergency-broadcasting-list.component.scss']
})
export class EmergencyBroadcastingListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'title', 'content', 'start_time', 'end_time', 'area', 'station', 'speaker', 'action'];
  dataSource: any;
  dataDialog: any[] = []


  constructor(
    private emergencyBroadcastingService$: EmergencyBroadcastingService,
    public dialog: MatDialog
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
    this.emergencyBroadcastingService$.getEmergencyBroadcasting().subscribe((data) => {
      this.dataSource.data = data;
    });
  }


  calculateRatio(a: number, b: number) {
    return ((a / b) * 100).toFixed(0);
  }

  openDialog(id:any): void {
    this.emergencyBroadcastingService$.getEmergencyBroadcasting().subscribe((data) => {
      this.dataDialog = data.filter((item: any) => item.id === id);
      this.dataDialog  = this.dataDialog[0].area;
      console.log(this.dataDialog)
      let dialogRef = this.dialog.open(AreaDialogComponent, {
      width: '500px',
        data: this.dataDialog,
      });
      console.log(data)
    dialogRef.afterClosed().subscribe(result => {});

  })}
}

@Component({
  selector: 'area-dialog',
  templateUrl: './area-dialog.component.html',
  styleUrls: ['./emergency-broadcasting-list.component.scss']
})
export class AreaDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AreaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }


}
