import { Component } from '@angular/core';
import {PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  public config: PerfectScrollbarConfigInterface = {};
  navigateData = [
    {
      title: 'Tổng quan',
      url: './dashboard'
    },
    {
      title: 'Quản lý lắp đặt',
      url: './install-management'
    },
    {
      title: 'Lịch quảng bá hình ảnh',
      url: './dashboard'
    },

  ]
}
