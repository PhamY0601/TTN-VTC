import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {API} from "../../helper/api";
import {header} from "../../app.constants";


@Injectable({
  providedIn: 'root'
})
export class ContentManagementService {

  constructor(private http: HttpClient) { }


  getEditorialContent(): Observable<HttpResponse<any>> {
    return this.http.get(`${API.EDITORIALCONTENT_URL}`, {
      observe: 'response',
    });
  }

  getRegistrationContent(): Observable<any> {
    const headers = header;
    let data: any[] = [];
    return this.http.get(`${API.REGISTRATIONCONTENT_URL}`, {headers}).pipe(map((res: any) => {

      res.data.forEach((item: any) => {
        let contentBody = item.content[0].ContentBody

        if (contentBody) {
          let content = JSON.parse(contentBody)
          item.content[0].contentData = content.text
        }
       data.push(item)
      })
      return data
    }))
  }


  getWarningContent(): Observable<HttpResponse<any>> {
    const headers = header;
    return this.http.get(`${API.WARNINGCONTENT_URL}`, {headers}).pipe(map((res: any) => {
      return res.data
    }))
  }

  getBroadcastSchedule(): Observable<HttpResponse<any>> {
    const headers = header;
    return this.http.get(`${API.DS_LICHPHAT_URL}`, {headers}).pipe(map((res: any) => {
      return res.data
    }))
  }

}
