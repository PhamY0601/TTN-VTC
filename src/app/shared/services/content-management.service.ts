import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {API} from "../../helper/api";


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

  getRegistrationContent(): Observable<HttpResponse<any>> {
    return this.http.get(`${API.REGISTRATIONCONTENT_URL}`, {
      observe: 'response',
    });
  }


  getWarningContent(): Observable<HttpResponse<any>> {
    return this.http.get(`${API.WARNINGCONTENT_URL}`, {
      observe: 'response',
    });
  }

}
