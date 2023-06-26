import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {CitiesService} from "../../services/cities.service";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {DistrictService} from "../../services/district.service";
import {DashboardService} from "../../services/dashboard.service";

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

  constructor( private activatedRoute: ActivatedRoute) {
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
}
