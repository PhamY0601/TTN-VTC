import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ContentManagementService} from "../../../../shared/services/content-management.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CitiesService} from "../../../../shared/services/cities.service";
import {COUNTRY} from "../../../../app.constants";

@Component({
  selector: 'app-registration-content',
  templateUrl: './registration-content-list.component.html',
  styleUrls: ['./registration-content-list.component.scss']
})
export class RegistrationContentListComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'date', 'station', 'area', 'type', 'time', 'url', 'content'];
  dataSource: any;
  toDay = new Date();
  districtsData: any[] = [];
  arrayDistrictsData: any[] = []
  wardsData: any[] = [];
  arrayWardsData: any[] = [];

  constructor(
    private contentManagementService$: ContentManagementService,
    private spinner: NgxSpinnerService,
    private citiesService$: CitiesService,

  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadData();
    this.getDistrict(COUNTRY());
    this.getWard();

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
    this.contentManagementService$.getRegistrationContent().subscribe((data) => {
      this.dataSource.data = data.body
    });
  }

  getDistrict(city: any) {
    this.citiesService$.getDistricts(city).subscribe((data) => {
      this.districtsData = data;
      this.districtsData.forEach((item: any) => {
        this.arrayDistrictsData.push(item.nameId)
      })
    })
  }

  getWard() {
    let arrayWardsData: any[] = [];
    this.citiesService$.getWards().subscribe((data) => {
      arrayWardsData = data
      for (let i in arrayWardsData) {
        for (let j in this.arrayDistrictsData) {
          if (this.arrayDistrictsData[j] === arrayWardsData[i].districtId) {
            this.arrayWardsData.push(arrayWardsData[i])
          }
        }
      }
    })
  }

  changeWards(nameId: any) {
    this.arrayWardsData.forEach((item:any) => {
      if (item.districtId === nameId) {
        this.wardsData.push(item)
      }
    })
  }

  districtEffect(nameId: any): void {
    this.wardsData = [];
    this.changeWards(nameId.value)
  }
}
