import {Component, Input, OnInit} from '@angular/core';
// import {circle, latLng, marker, polygon, tileLayer} from "leaflet";
// import * as L from 'leaflet';
// import 'leaflet.markercluster';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit  {
  @Input() coords!:number[][];
  map: any;
  // options = {
  //   layers: [
  //     tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
  //   ],
  //   zoom: 6,
  //   center: latLng(10.1291, 106.3131)
  // };
  // markerClusterGroup!: L.MarkerClusterGroup;
  // markerClusterData: L.Marker[] = [];
  // markerClusterOptions!: L.MarkerClusterGroupOptions;

  constructor() { }
  ngOnInit() {
    // // console.log(L);
    // // console.log(this.markerClusterOptions);
    // this.markerClusterData = this.generateMarker(this.coords);
  }


  onMapReady(map: any) {
    // get a local reference to the map as we need it later
    this.map = map;
    console.log('test ready')
    setTimeout(()=>{
      this.map.reload()
    })
  }


  // markerClusterReady(group: L.MarkerClusterGroup) {
  //   console.log('test ready')
  //   setTimeout(()=>{
  //     this.markerClusterGroup = group;
  //   })
  //
  // }

  // generateMarker(coords: number[][]): L.Marker[] {
  //   const data: L.Marker[] = [];
  //   const icon = L.icon({
  //     iconSize: [25, 41],
  //     iconAnchor: [10, 41],
  //     popupAnchor: [2, -40],
  //     // specify the path here
  //     iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  //     shadowUrl:
  //       "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
  //   });
  //
  //   for (let i = 0; i < coords.length; i++) {
  //     data.push(L.marker( [coords[i][0],coords[i][1]], { icon }));
  //   }
  //   return data;
  // }
}
