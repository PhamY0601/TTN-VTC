import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss']
})
export class ContentCardComponent {
  @Input() district?: string;
  @Input() speaker_on?: number;
  @Input() speaker_establish?:number;
  @Input() speaker_off?: number;
  @Input() video_onl?: number;
  @Input() video_off?: number;
  @Input() transmitter?: string;

}
