import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {API} from "../../helper/api";


@Injectable({
  providedIn: 'root'
})
export class ScheduleListService {

  private AUTH_TOKEN_KEY = 'token';
  header = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem(this.AUTH_TOKEN_KEY)}`})

  constructor(private http: HttpClient) { }


  getScheduleList(): Observable<any> {
    const headers = this.header;
    return this.http.get(`${API.SCHEDULE_LIST_URL}`, {headers}).pipe(map((res: any) => {
     let data = res.data;
     console.log(data)
     data.forEach((item:any) => {
       console.log(item.Locations)
       let district = JSON.parse(item.Locations)
      console.log(typeof district)
       console.log(district)
     })
      return res.data
    }))
  }


}
