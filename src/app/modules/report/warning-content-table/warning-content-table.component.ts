import {AfterViewInit, Component,  OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-warning-content-table',
  templateUrl: './warning-content-table.component.html',
  styleUrls: ['./warning-content-table.component.scss']
})
export class WarningContentTableComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: any;

  displayedColumn: string[] = ['stt', 'date', 'time', 'station', 'area', 'news', 'keywords', 'record'];

  warningContentData = [
    {
      id: 0,
      date: '1624957832',
      station: 'Trạm 1',
      district: 'Huyện A',
      ward: 'Xã A',
      news: 'Bản tin 1',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
      record: '../../../../../assets/audio/Vi_Toi_Con_Song_Tien_Tien.mp3'
    },
    {
      id: 1,
      date: '1624957832',
      station: 'Trạm 2',
      district: 'Huyện B',
      ward: 'Xã A',
      news: 'Bản tin 2',
      keywords: ['keyword1', 'keyword2', 'keyword3', 'keyword4'],
      record: '../../../../../assets/audio/Vi_Toi_Con_Song_Tien_Tien.mp3'
    },
    {
      id: 2,
      date: '1624957832',
      station: 'Trạm 3',
      district: 'Huyện C',
      ward: 'Xã B',
      news: 'Bản tin 3',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
      record: '../../../../../assets/audio/Vi_Toi_Con_Song_Tien_Tien.mp3'
    },
    {
      id: 3,
      date: '1624957832',
      station: 'Trạm 4',
      district: 'Huyện A',
      ward: 'Xã B',
      news: 'Bản tin 3',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
      record: '../../../../../assets/audio/Vi_Toi_Con_Song_Tien_Tien.mp3'
    },
    {
      id: 4,
      date: '1624957832',
      station: 'Trạm 2',
      district: 'Huyện A',
      ward: 'Xã A',
      news: 'Bản tin 1',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
      record: '../../../../../assets/audio/Vi_Toi_Con_Song_Tien_Tien.mp3'
    },
    {
      id: 5,
      date: '1624957832',
      station: 'Trạm 3',
      district: 'Huyện A',
      ward: 'Xã A',
      news: 'Bản tin 1',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
      record: '../../../../../assets/audio/Vi_Toi_Con_Song_Tien_Tien.mp3'
    },
  ]


  constructor() {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadData();


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loadData(): void {
    this.dataSource.data = this.warningContentData;
  }




}
