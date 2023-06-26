import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CitiesService} from "../../../shared/services/cities.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {COUNTRY} from "../../../app.constants";
import {NgxSpinnerService} from "ngx-spinner";
import {AppConfirmService} from "../../../shared/services/app-confirm/app-confirm.service";

@Component({
  selector: 'app-radio-manager-list',
  templateUrl: './radio-manager-list.component.html',
  styleUrls: ['./radio-manager-list.component.scss']
})
export class RadioManagerListComponent implements OnInit, AfterViewInit  {

  dataSource: any;
  @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  displayedColumn: string[] = ['stt', 'ward', 'district', 'type', 'schedule', 'status', 'url', 'actions'];
  eventSubscriber: Subscription | undefined;

  constructor(private citiesService$: CitiesService,
              private confirmService: AppConfirmService,
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
    }, 1500);
    this.citiesService$.getRadioStreaming(_COUNTRY).subscribe((data) => {
      console.log(data)
      this.dataSource.data = data;
    });
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteItem(row:any) {
    this.confirmService.confirm({message: `Bạn có chắc chắn muốn xóa ${row.name}?`})
      .subscribe(res => {
        if (res) {
         console.log(res)
        }
      });
  }

}
