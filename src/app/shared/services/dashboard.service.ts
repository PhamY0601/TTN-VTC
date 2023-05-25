import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {API} from "../../helper/api";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private AUTH_TOKEN_KEY = 'token';
  constructor(private http: HttpClient) { }


  getTotal(): Observable<any>  {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem(this.AUTH_TOKEN_KEY)}` });
    return this.http.get(`${API.DASHBOARD_URL}`,{ headers }).pipe(map((res:any) => {
      let array = res.data
      let totalData = this.getData(array, 'total');
      let result: any[] = []
      totalData.forEach((item:any) => {
        switch (item.name) {
          case 'Agency':
            result.push({
              name: item.name,
              total: item.total,
              name_display: 'Nhà cung cấp',
              icon: "supplier"
            })
            break;
          case 'AudioBox':
            result.push({
              name: item.name,
              total: item.total,
              name_display: 'Loa',
              icon: "speaker"
            })
            break;
          case 'MediaBox':
            result.push({
              name: item.name,
              total: item.total,
              name_display: 'Bản tin điện tử',
              icon: "youtube"
            })
            break;
          case 'Record':
            result.push({
              name: item.name,
              total: item.total,
              name_display: 'Bản tin phát hành',
              icon: "document"
            })
            break;

        }
      })
      return result
    }));


  }

  getRecordActive(): Observable<any>  {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem(this.AUTH_TOKEN_KEY)}` });
    return this.http.get(`${API.DASHBOARD_URL}`,{ headers }).pipe(map((res:any) => {
      let array = res.data
      let totalData = this.getData(array, 'record_active');
      let result: any[] = []
      totalData.forEach((item:any) => {
        result.push({
          title: item.Title,
          province: item.province,
          district: item.district,
          ward: item.ward,
          date: item.ActivedDate,
          start: item.Start,
          end: item.End
        })
      })
      console.log(result)
      return result
    }));


  }

  getData (array: any, name: string): any {

    for (let i in array) {
      if(array[i].name === name) {
      return array[i].value
      }
    }

}




}
