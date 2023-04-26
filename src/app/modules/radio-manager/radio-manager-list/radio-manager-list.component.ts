import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CitiesService} from "../../../shared/services/cities.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {COUNTRY} from "../../../app.constants";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-radio-manager-list',
  templateUrl: './radio-manager-list.component.html',
  styleUrls: ['./radio-manager-list.component.scss']
})
export class RadioManagerListComponent implements OnInit, AfterViewInit, OnDestroy  {

  dataSource: any;
  @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  displayedColumn: string[] = ['stt', 'ward', 'district', 'type', 'schedule', 'status', 'url', 'actions'];
  eventSubscriber: Subscription | undefined;

  constructor(private citiesService$: CitiesService,
              // private eventManager: JhiEventManager,
              private spinner: NgxSpinnerService,) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {

    // this.changedList()
    this.loadData(COUNTRY())

  }

  loadData(_COUNTRY:any): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.citiesService$.getRadioStreaming(_COUNTRY).subscribe((data) => {
      this.dataSource.data = data;
    });

  }
  // changedList() {
  //   this.eventSubscriber = this.eventManager.subscribe('radioManagerModified', () => this.loadData(COUNTRY()));
  // }

  ngOnDestroy() {
    if (this.eventSubscriber instanceof Subscription) {
      // this.eventManager.destroy(this.eventSubscriber);
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



}
