import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {API} from "../../helper/api";
import {IFieldSource} from "../models/source-info.model";


@Injectable({
  providedIn: 'root'
})
export class SourceInfoManagementService {

  private AUTH_TOKEN_KEY = 'token';
  header = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem(this.AUTH_TOKEN_KEY)}`})

  constructor(private http: HttpClient) { }


  getFieldSource(): Observable<any> {
    const headers = this.header;
    return this.http.get(`${API.FIELDSOURCE_URL}`, {headers}).pipe(map((res: any) => {
      return res.data
    }))
  }

  getGeographicSource(): Observable<HttpResponse<any>> {
    const headers = this.header;
    return this.http.get(`${API.GEOGRAPHICSOURCE_URL}`, {headers}).pipe(map((res: any) => {
      return res.data
    }))

  }



}
