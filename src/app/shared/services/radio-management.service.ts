import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {API} from "../../helper/api";
import {header} from "../../app.constants";


@Injectable({
  providedIn: 'root'
})
export class RadioManagementService {

  constructor(private http: HttpClient) { }


  getRadioManagement(): Observable<any> {
    const headers = header;
    return this.http.get(`${API.RADIO_MANAGEMENT_URL}`, {headers}).pipe(map((res: any) => {
      return res.data
    }))
  }


}
