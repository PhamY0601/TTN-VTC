import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss']
})
export class ContentCardComponent {

  @Input() contentCardItem? : any
  // @Output() itemSelected = new EventEmitter<any>();

  // getItem() {
  //   this.itemSelected.emit(this.contentCardItem);
  // }
}
