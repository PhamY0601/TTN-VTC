import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-emergency-broadcasting-list',
  templateUrl: './emergency-broadcasting-list.component.html',
  styleUrls: ['./emergency-broadcasting-list.component.scss']
})
export class EmergencyBroadcastingListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['stt', 'title', 'content', 'start_time', 'end_time', 'area', 'station', 'speaker'];
  dataSource: any;

  data = [
    {
      id: 0,
      title: 'Tiêu đề 1',
      content: 'Nội dung 1',
      start_time: '1658699914',
      end_time: '1719786694',
      district: 'Huyện A',
      ward: 'Xã A',
      station: 100,
      broadcast_station: 34,
      speaker: 120,
      play_successful: 70,
    },
    {
      id: 1,
      title: 'Tiêu đề 2',
      content: 'Nội dung 2',
      start_time: '1658699914',
      end_time: '1719786694',
      district: 'Huyện B',
      ward: 'Xã B',
      station: 120,
      broadcast_station: 54,
      speaker: 100,
      play_successful: 80,
    },
    {
      id: 2,
      title: 'Tiêu đề 3',
      content: 'Nội dung 3',
      start_time: '1658699914',
      end_time: '1719786694',
      district: 'Huyện C',
      ward: 'Xã C',
      station: 160,
      broadcast_station: 150,
      speaker: 125,
      play_successful: 100,
    },
    {
      id: 3,
      title: 'Tiêu đề 4',
      content: 'Nội dung 4',
      start_time: '1658699914',
      end_time: '1719786694',
      district: 'Huyện A',
      ward: 'Xã A',
      station: 60,
      broadcast_station: 34,
      speaker: 190,
      play_successful: 140,
    },
    {
      id: 4,
      title: 'Tiêu đề 5',
      content: 'Nội dung 5',
      start_time: '1658699914',
      end_time: '1719786694',
      district: 'Huyện E',
      ward: 'Xã E',
      station: 100,
      broadcast_station: 70,
      speaker: 120,
      play_successful: 80,
    },
    {
      id: 5,
      title: 'Tiêu đề 6',
      content: 'Nội dung 6',
      start_time: '1658699914',
      end_time: '1719786694',
      district: 'Huyện A',
      ward: 'Xã A',
      station: 130,
      broadcast_station: 34,
      speaker: 70,
      play_successful: 60,
    },
    {
      id: 6,
      title: 'Tiêu đề 7',
      content: 'Nội dung 7',
      start_time: '1658699914',
      end_time: '1719786694',
      district: 'Huyện A',
      ward: 'Xã A',
      station: 100,
      broadcast_station: 34,
      speaker: 120,
      play_successful: 120,
    },

  ]

  constructor() {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.dataSource.data = this.data;
  }


  calculateRatio (a:number, b: number) {
    return ((a/b)*100).toFixed(0);
  }
}
