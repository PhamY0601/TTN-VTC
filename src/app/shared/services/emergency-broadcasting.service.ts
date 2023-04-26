import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {API} from "../../helper/api";


@Injectable({
  providedIn: 'root'
})
export class EmergencyBroadcastingService {

  constructor(private http: HttpClient) {
  }


  getEmergencyBroadcasting(): Observable<any> {
    let result: any[] = [];
    let arr: any;
    return this.http.get(`${API.EMERGENCYBROADCASTING_URL}`, {
      observe: 'response',
    }).pipe(
      map((res) => {
        arr = res.body;
        arr.forEach((item: any) => {
          let station = item.station;
          let sum = 0;
          let sum_success = 0;
          station.forEach((k: any) => {
            sum = sum + k.speaker;
            if (k.accept === true) {
            }
            sum_success = sum_success + k.play_successful
          })

          result.push({
            id: item.id,
            title: item.title,
            content: item.content,
            performer: item.performer,
            start_time: item.start_time,
            time: item.time,
            receive_station: item.receive_station,
            station: item.station.length,
            broadcast_station: item.station.filter((k: any) => k.accept === true).length,
            speaker: sum,
            play_successful: sum_success,
            area: item.area,
            station_list: item.station
          })
        })

        return result
      })
    );

  }


}
