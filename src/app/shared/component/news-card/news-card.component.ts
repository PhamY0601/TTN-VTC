import {AfterViewInit, Component, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  AudioDialogComponent
} from "../../../modules/source-info-management/source-info-management/field-source/field-source-list/field-source-list.component";

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() newsData: any;
  @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;
  displayedColumns: string[] = ['content'];
  param?: string | null ='';
  dataSource: any;
  COUNTRY:any;
  dataDialog: any[] = [];
  districtData: any[] = []

  constructor( private activatedRoute: ActivatedRoute,
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
    this.paginator._intl.itemsPerPageLabel="Số bản ghi mỗi trang là: ";
  }

  //Phát hiện thay đổi của Input
  ngOnChanges(changes: SimpleChanges) {
    this.loadData()
  }

  loadData(): void {
      this.dataSource.data = this.newsData
  }


  openDialog(id: any): void {

    // lọc những bản tin cùng ID
    let news = this.newsData.filter((item: any) => item.id === 'BAE76E45-7524-EE11-8162-00155D002406')

    console.log(news)
    for (const data of news) {
      const district = data.district;
      const ward = data.ward;

      const existingDistrict = this.districtData.find(d => d.district === district);

      if (existingDistrict) {
        existingDistrict.wards.push(ward);
      } else {

        this.districtData.push({
          districts: district,
          wards: [ward]
        });
      }
    }
    console.log(this.districtData)


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
  ) {}


  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }


}

