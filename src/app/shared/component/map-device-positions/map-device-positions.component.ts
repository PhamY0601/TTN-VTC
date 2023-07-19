import {AfterViewInit, Component, ElementRef} from '@angular/core';
import * as L from "leaflet";


@Component({
  selector: 'app-map-device-positions',
  templateUrl: './map-device-positions.component.html',
  styleUrls: ['./map-device-positions.component.scss']
})
export class MapDevicePositionsComponent implements AfterViewInit{

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
   this.initMap()

  }


  private map:any;

  private initMap(): void {
    let htmlRefMap = this.elementRef.nativeElement.querySelector(`#map`);
    this.map = L.map( htmlRefMap, {
      center: [ 10.769444, 106.681944 ],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // maxZoom: 16,
      // minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    var marker = L.marker([10.769444, 106.681944]).addTo(this.map);
  }
}
