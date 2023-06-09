import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
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
export class NewsCardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;
  displayedColumns: string[] = ['content'];
  param?: string | null ='';
  dataSource: any;
  COUNTRY:any;

  constructor(private citiesService$: CitiesService,
              private districtService$: DistrictService,
              private dashboardService$: DashboardService,
              private activatedRoute: ActivatedRoute) {
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

  loadData(): void {
    // if(this.param !== null) {
    //   this.districtService$.getNews(_COUNTRY,this.param).subscribe((data) => {
    //     data.sort(function (i1:any, i2:any   ){ return i2.starttime-i1.starttime;})
    //     this.dataSource.data = data;
    //   });
    // } else {
    //   this.citiesService$.getNews(_COUNTRY).subscribe((data) => {
    //     data.sort(function (i1:any, i2:any   ){ return i2.starttime-i1.starttime;})
    //     this.dataSource.data = data;
    //   });
    // }
    this.dashboardService$.getTotal().subscribe((data)=> {
      let array = data.filter((item: any) => item.name === 'record_active').map((item: any) => item.value)
      array[0].sort(function (i1:any, i2:any   ){ return i2.starttime-i1.starttime;})
      this.dataSource.data = array[0];
    })


  }
}
