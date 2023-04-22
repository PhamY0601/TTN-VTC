import {Component, Input, OnInit} from '@angular/core';
import { IconService } from "../../services/icon.service";

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent implements OnInit {
  @Input() title?: string;
  @Input() count?: string;
  @Input() icon?: string;
  constructor(private iconService: IconService) {
    iconService.init();
  }
  ngOnInit(): void {}
}
