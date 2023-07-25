import {AfterViewInit, Component, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() newsData: any;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  displayedColumns: string[] = ['content'];
  param?: string | null = '';
  dataSource: any;
  COUNTRY: any;
  dataDialog: any[] = [];
  districtData: any[] = []

  constructor(private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.param = params.get('district');
    });
    this.loadData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Số bản ghi mỗi trang là: ";
  }

  //Phát hiện thay đổi của Input
  ngOnChanges(changes: SimpleChanges) {
    this.loadData()
  }

  loadData(): void {
    const groupedData = this.newsData.reduce((result:any, current:any) => {
      const { id, province, district, ward, ...rest } = current;
      if (!result[id]) {
        result[id] = { id, items: [rest] };
      } else {
        result[id].items.push(rest);
      }
      return result;
    }, {});

    console.log(Object.values(groupedData))
    this.dataSource.data = Object.values(groupedData);


  }


  openDialog(id: any): void {

    // lọc những bản tin cùng ID
    let news = this.newsData.filter((item: any) => item.id === id)


    const groupedData = news.reduce((acc: any, curr: any) => {
      if (!acc[curr.district]) {
        acc[curr.district] = [];
      }
      acc[curr.district].push(curr.ward);
      return acc;
    }, {});

    this.districtData = Object.entries(groupedData).map(([district, wards]) => ({
      district,
      wards,
      display: false
    }));


    this.dataDialog = this.newsData.filter((item: any) => item.id === id);
    let dialogRef = this.dialog.open(NewsCardDialogComponent, {
      width: '650px',
      data: {data: news, area: this.districtData},

    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}


@Component({
  selector: 'news-card-dialog',
  templateUrl: './news-card-dialog.html',
})
export class NewsCardDialogComponent implements OnInit {

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

