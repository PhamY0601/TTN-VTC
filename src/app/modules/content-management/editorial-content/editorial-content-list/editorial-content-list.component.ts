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
  selector: 'app-editorial-content-list',
  templateUrl: './editorial-content-list.component.html',
  styleUrls: ['./editorial-content-list.component.scss']
})
export class EditorialContentListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'date', 'radio-station', 'field', 'type', 'time', 'content', 'status'];
  dataSource: any;
  today = new Date();
  districtsData: any[] = [];
  wardsData: any[] = [];



  constructor(
    private contentManagementService$: ContentManagementService,
    private spinner: NgxSpinnerService,
    private locationsService$: LocationsService
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
    this.contentManagementService$.getEditorialContent().subscribe((data) => {
      this.dataSource.data = data.body
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
