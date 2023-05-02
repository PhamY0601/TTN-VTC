import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NgxSpinnerService} from "ngx-spinner";
import {MatTableDataSource} from "@angular/material/table";
import {ContentManagementService} from "../../../../shared/services/content-management.service";
import {CitiesService} from "../../../../shared/services/cities.service";
import {refCount} from "rxjs";

@Component({
  selector: 'app-warning-content-list',
  templateUrl: './warning-content-list.component.html',
  styleUrls: ['./warning-content-list.component.scss']
})
export class WarningContentListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'keyword', 'warning_content', 'method','warning_level', 'receiver', 'action'];
  dataSource: any;


  constructor(
    private contentManagementService$: ContentManagementService,
    private citiesService$: CitiesService,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadData();
    // this.loadSpeaker()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.contentManagementService$.getWarningContent().subscribe((data) => {
      this.dataSource.data = data.body

    });
  }
  // loadSpeaker() {
  //   this.citiesService$.getSpeaker().subscribe((data) => {
  //     data.forEach((item:any) =>{
  //       this.citiesService$.post(item).subscribe(
  //       );
  //       }
  //     )
  //
  //   });
  // }
}
