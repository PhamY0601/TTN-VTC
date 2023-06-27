import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {EmergencyBroadcastingService} from "../../../shared/services/emergency-broadcasting.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-emergency-broadcasting-list',
  templateUrl: './emergency-broadcasting-list.component.html',
  styleUrls: ['./emergency-broadcasting-list.component.scss']
})
export class EmergencyBroadcastingListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'title', 'content', 'date', 'start_time', 'end_time', 'area', 'station', 'speaker', 'action'];
  dataSource: any;
  dataDialog: any[] = []


  constructor(
    private emergencyBroadcastingService$: EmergencyBroadcastingService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
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
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.emergencyBroadcastingService$.getEmergencyBroadcasting().subscribe((data) => {
      data.sort((i1: any, i2: any) => {
        return i2.date - i1.date
      })
      this.dataSource.data = data;

    });

    this.emergencyBroadcastingService$.data$.subscribe(data => {
      data.sort((i1: any, i2: any) => {
        return i2.date - i1.date
      })
      this.dataSource.data = data
    });
  }


  calculateRatio(a: number, b: number) {
    return ((a / b) * 100).toFixed(0);
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id: any): void {
    this.emergencyBroadcastingService$.getEmergencyBroadcasting().subscribe((data) => {
      this.dataDialog = data.filter((item: any) => item.id === id);
      console.log(this.dataDialog[0].area)

      //group theo district
      const groupedData = this.dataDialog[0].area.reduce((acc: any, item: any) => {
        if (!acc[item.district]) {
          acc[item.district] = [];
        }
        acc[item.district].push(item);
        return acc;
      }, {});

      let area: any[] = []
      for (let i in groupedData) {
        area.push({district: i, district_display: groupedData[i][0].district_display, value: groupedData[i]})
      }
      console.log(area)
      this.dataDialog = area;
      let dialogRef = this.dialog.open(AreaDialogComponent, {
        width: '700px',
        data: this.dataDialog,
      });
      dialogRef.afterClosed().subscribe(result => {
      });

    })
  }

}

@Component({
  selector: 'area-dialog',
  templateUrl: './area-dialog.component.html',
  styleUrls: ['./emergency-broadcasting-list.component.scss']
})
export class AreaDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EmergencyBroadcastingListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }


}
