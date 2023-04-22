import { Component } from '@angular/core';
import {PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  public config: PerfectScrollbarConfigInterface = {};

}
