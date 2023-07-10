import { Component } from '@angular/core';
import {IconService} from "./shared/services/icon.service";
import {COUNTRY} from "./app.constants";
import {ReportBroadcastTimeService} from "./shared/services/report-broadcast-time.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private iconService: IconService,
              private reportBroadcastTimeService$: ReportBroadcastTimeService
              ) {
    iconService.init();
  }
  title = 'VTC-ICS';


  ngOnInit() {
    console.log('đã vào app module')

  }

}
