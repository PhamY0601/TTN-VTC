import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {API} from "../../helper/api";
import {header} from 'src/app/app.constants';


@Injectable({
  providedIn: 'root'
})
export class EmergencyBroadcastingService {

  dataBehaviorSubject = new BehaviorSubject<any>(null);
  data$ = this.dataBehaviorSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  post(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`${API.POST_EMERGENCYBROADCASTING_URL}`, data, {
      observe: 'response',
    });
  }

  getEmergencyBroadcasting(): Observable<any> {
    const headers = header;
    let result: any[] = [];
    let arr: any[] = []
    return this.http.get(`${API.EMERGENCYBROADCASTING_URL}`, {headers}).pipe(
      map((res) => {

        Object.entries(res).map(([key, value]) => {
          if (key === 'data') {
            arr = value
          }
        });

        arr.forEach((item: any) => {
          result.push({
            id: item.id,
            title: item.title,
            content: item.description,
            start_time: item.start,
            end_time: item.end,
            area: item.destinations,
            total_agent_success: item.totalAgent_success,
            total_agencies: item.totalAgencies,
            total_device_sending: item.totalDevice_sending,
            total_device: item.totalDevice,
            date:  (new Date(item.activeddate))
          })
        })
       return result
      })
    );

  }

  changeData(data:any) {
    this.dataBehaviorSubject.next(data);
  }


  getDetail(id:any): Observable<any> {
    const headers = header;
    let arr:any;
    return this.http.get(`${API.EMERGENCYBROADCASTING_DETAIL_URL }${id}`,{headers} ).pipe(
      map(res => {
        Object.entries(res).map(([key, value]) => {
          if (key === 'data') {
            arr = value
          }
        });
        let receive_station: any[] = []

        arr[0].agencies.forEach((item:any) =>{
         receive_station.push(item.agencyName)
        })

        return {
          id: arr[0].id,
          title: arr[0].title,
          content: arr[0].description,
          start_time: arr[0].start,
          end_time: arr[0].end,
          duration: arr[0].duration,
          destinations: arr[0].destinations,
          agencies: arr[0].agencies,
          total_agent_success: arr[0].totalAgent_success,
          total_agencies: arr[0].totalAgencies,
          total_device_sending: arr[0].totalDevice_sending,
          total_device_playing: arr[0].totalDevice_playing,
          total_device: arr[0].totalDevice,
          total_duration: arr[0].totalDuration,
          receive_station: receive_station,
          link_audio: API.AUDIO_URL + arr[0].id + '.wav',
          performer: arr[0].excuted_by ? arr[0].excuted_by : ''
        }
      })
    );
  }

}
