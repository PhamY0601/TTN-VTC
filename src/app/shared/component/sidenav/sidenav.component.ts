import { Component } from '@angular/core';
import {PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  public config: PerfectScrollbarConfigInterface = {};
}
