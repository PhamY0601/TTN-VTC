import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from "@angular/material/paginator";
import {CitiesService} from "../../../shared/services/cities.service";
import {ActivatedRoute} from "@angular/router";
import {DistrictService} from "../../../shared/services/district.service";
import {COUNTRY} from "../../../app.constants";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-install-management',
  templateUrl: './install-management.component.html',
  styleUrls: ['./install-management.component.scss']
})
export class InstallManagementComponent implements OnInit, OnDestroy, AfterViewInit {

  display: boolean = true;
  param?: string | null = '';
  dataSourceFirst: any;
  @ViewChild('paginatorFirst', {static: true}) paginatorFirst!: MatPaginator;
  @ViewChild('tableFirstSort') tableFirstSort!: MatSort;
  displayedColumn1: string[] = ['stt', 'district', 'speaker', 'video', 'transmitter'];


  dataSourceSecond: any;
  @ViewChild('paginatorSecond', {static: true}) paginatorSecond!: MatPaginator;
  @ViewChild('tableSecondSort') tableSecondSort!: MatSort;
  displayedColumn2: string[] = ['stt', 'city', 'district', 'ward', 'c_endpointtype', 'createDate', 'position', 'status'];

  constructor(private citiesService$: CitiesService,
              private districtService$: DistrictService,
              private activatedRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,) {
    this.dataSourceFirst = new MatTableDataSource([]);
    this.dataSourceSecond = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.param = params.get('district');
    });
    this.loadData(COUNTRY());


  }

  ngAfterViewInit() {

    this.dataSourceFirst.paginator = this.paginatorFirst;
    this.dataSourceFirst.sort = this.tableFirstSort;

    this.dataSourceSecond.paginator = this.paginatorSecond;
    this.dataSourceSecond.sort = this.tableSecondSort;
  }

  ngOnDestroy() {
  }


  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSecond.filter = filterValue.trim().toLowerCase();
  }

  loadData(_COUNTRY: any): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);

    this.citiesService$.getSpeakerLocation(_COUNTRY).subscribe((data) => {
      this.dataSourceSecond.data = data;

    });

    if (this.param !== null) {
      this.districtService$.getInfoDistrict(_COUNTRY, this.param).subscribe((data) => {
          this.dataSourceFirst.data = data;

        }
      )
    } else {
      this.citiesService$.getInstallInfo(_COUNTRY).subscribe((data) => {
        this.dataSourceFirst.data = data;

      });
    }

  }


  coords = [
    [20.3653, 105.2663],
    [16.0000, 108.1458],
    [19.8050, 105.6999],
    [20.0617, 105.8055],
    [19.9269, 105.8877],
  ]
}

