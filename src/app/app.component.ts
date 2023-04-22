import { Component } from '@angular/core';
import {IconService} from "./shared/services/icon.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private iconService: IconService) {
    iconService.init();
  }
  title = 'VTC-ICS';


}
