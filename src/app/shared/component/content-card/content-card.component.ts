import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
})
export class ContentCardComponent implements OnInit{

  @Input() contentCardItem? : any
  // @Output() itemSelected = new EventEmitter<any>();
  param?: string | null = '';
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.param = params.get('district');
    });
  }

  // getItem() {
  //
  //   this.itemSelected.emit(this.contentCardItem);
  // }
}
