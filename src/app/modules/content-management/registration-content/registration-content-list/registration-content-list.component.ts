import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ContentManagementService} from "../../../../shared/services/content-management.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CitiesService} from "../../../../shared/services/cities.service";
import {COUNTRY} from "../../../../app.constants";
import {LocationsService} from "../../../../shared/services/locations.service";

@Component({
  selector: 'app-registration-content',
  templateUrl: './registration-content-list.component.html',
  styleUrls: ['./registration-content-list.component.scss']
})
export class RegistrationContentListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'date', 'time', 'type', 'url', 'content', 'area'];
  dataSource: any;
  today = new Date();
  districtsData: any[] = [];

  wardsData: any[] = [];



  constructor(
    private contentManagementService$: ContentManagementService,
    private locationsService$: LocationsService,
    private spinner: NgxSpinnerService
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadData();
    this.getDistrict();
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
      data.sort((item1: any, item2: any) => {
        let date1: any = new Date(item1.date);
        let date2: any = new Date(item2.date);
        return date2 - date1;
      });
      this.dataSource.data = data

    });

  }


  getDistrict() {
    this.locationsService$.getLocations().subscribe((data) => {
      data[0].children.forEach((district:any) => {
        this.districtsData.push({
          code: district.Code,
          name: district.Name,
        })
      })

    })
  }

  districtEffect(code: any): void {
    this.wardsData = [];
    this.getWard(code)
  }

  getWard(code:any):void {
    this.locationsService$.getLocations().subscribe((data) => {
      data[0].children.forEach((district:any) => {
        if(district.Code === code) {
          district.children.forEach((ward:any) => {
            this.wardsData.push({
              code: ward.Code,
              name: ward.Name,
            })
          })

        }
      })

    })
  }
}
