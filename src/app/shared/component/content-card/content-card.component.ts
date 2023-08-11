import { AfterViewInit, Component, Inject, Input, OnInit,ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
})
export class ContentCardComponent implements OnInit {

  @Input() contentCardItem?: any
  area: any;
  param?: string | null = '';
  private dialogRef!: MatDialogRef<ContentCardComponent>

  constructor(private activatedRoute: ActivatedRoute,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.param = params.get('district');
    });
    if(this.param === this.contentCardItem.districtCode) {
      this.area = this.contentCardItem.ward
    }else  {
      this.area = this.contentCardItem.district
    }

  }


  openDialog(data: any, title_device: string, title:string, area: string ): void {
    let dialogRef = this.dialog.open(DeviceListComponent, {
      width: '750px',
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {});
    dialogRef.componentInstance.area = area;
    dialogRef.componentInstance.title_device = title_device;
    dialogRef.componentInstance.title = title
  }

}


@Component({
  selector: 'device-list.html',
  templateUrl: './device-list.html',

})
export class DeviceListComponent implements OnInit, AfterViewInit {

  dataSource: any;
  title_device?: any
  title?: any
  area?: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumn: string[] = ['stt', 'deviceId', 'agency', 'create_date'];

  constructor(public dialogRef: MatDialogRef<ContentCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataSource = new MatTableDataSource([]);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data)
    this.dataSource.data = this.data
    console.log(this.area)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
