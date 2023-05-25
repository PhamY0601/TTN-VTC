import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-see-more',
  templateUrl: './see-more.component.html',
  styleUrls: ['./see-more.component.scss']
})
export class SeeMoreComponent {
  @Input() content?: string
  isReadMore = true;

  showText() {
    this.isReadMore = !this.isReadMore;
  }
}
