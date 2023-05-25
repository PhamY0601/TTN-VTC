import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {API} from "../../helper/api";
import {IFieldSource} from "../models/source-info.model";


@Injectable({
  providedIn: 'root'
})
export class SourceInfoManagementService {

  constructor(private http: HttpClient) { }


  getFieldSource(): Observable<HttpResponse<any>> {
    return this.http.get(`${API.FIELDSOURCE_URL}`, {
      observe: 'response',
    });
  }

  getGeographicSource(): Observable<HttpResponse<any>> {
    return this.http.get(`${API.GEOGRAPHICSOURCE_URL}`, {
      observe: 'response',
    });
  }



}
