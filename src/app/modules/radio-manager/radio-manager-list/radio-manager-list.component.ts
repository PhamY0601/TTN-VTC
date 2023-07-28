import {AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CitiesService} from "../../../shared/services/cities.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {COUNTRY} from "../../../app.constants";
import {NgxSpinnerService} from "ngx-spinner";
import {AppConfirmService} from "../../../shared/services/app-confirm/app-confirm.service";
import {RadioManagementService} from "../../../shared/services/radio-management.service";
import {ScheduleService} from "../../../shared/services/schedule.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-radio-manager-list',
  templateUrl: './radio-manager-list.component.html',
  styleUrls: ['./radio-manager-list.component.scss']
})
export class RadioManagerListComponent implements OnInit, AfterViewInit {

  dataSource: any;
  dataDialog: any[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumn: string[] = ['stt', 'title', 'type', 'start_date', 'end_date', 'url', 'agency', 'location', 'actions'];

  constructor(private radioManagementService$: RadioManagementService,
              private confirmService: AppConfirmService,
              private spinner: NgxSpinnerService,
              private scheduleService$: ScheduleService,
              public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadData(COUNTRY())
  }

  loadData(_COUNTRY: any): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);

    this.scheduleService$.getScheduleList().subscribe((data: any) => {
      this.dataSource.data = data
    });
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteItem(row: any) {
    this.confirmService.confirm({message: `Bạn có chắc chắn muốn xóa ${row.name}?`})
      .subscribe(res => {
        if (res) {
          console.log(res)
        }
      });
  }

  openDialog(id: any): void {
    this.scheduleService$.getScheduleDetail(id).subscribe((data) => {
      this.dataDialog = data.locations
      let dialogRef = this.dialog.open(AreaDialogComponent, {
        width: '500px',
        data: this.dataDialog,
      });
      dialogRef.afterClosed().subscribe(result => {
      });

    })
  }

}

@Component({
  selector: 'area-schedule-dialog',
  templateUrl: './area-schedule-dialog.component.html',

})
export class AreaDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RadioManagerListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }


}
