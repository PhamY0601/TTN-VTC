import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
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
  dataDialog: any[] = [];

  param?: string | null = '';

  constructor(private activatedRoute: ActivatedRoute,
              public dialog: MatDialog) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.param = params.get('district');
    });
  }


  openDialog(data: any): void {
    let dialogRef = this.dialog.open(DeviceListComponent, {
      width: '700px',
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {});

  }

}


@Component({
  selector: 'device-list.html',
  templateUrl: './device-list.html',

})
export class DeviceListComponent implements OnInit, AfterViewInit {

  dataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


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
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
