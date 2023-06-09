import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {API} from "../../helper/api";
import {COUNTRY, COUNTRY_TITLE, header} from "../../app.constants";


@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient) {}

  getLocations(): Observable<any> {
    const headers = header;
    let result: any[] = [];
    let arr: any[] = []
    return this.http.get(`${API.LOCATIONS_URL}`, {headers}).pipe(
      map((res) => {

        Object.entries(res).map(([key, value]) => {
          if (key === 'data') {
            arr = value
          }
        });

        let country = COUNTRY_TITLE()
        let locations = this.nestData(arr);

        locations.forEach((item:any) => {
          if(item.Name === country) {
            result.push(item);
          }
        })

        return result
      })
    );

  }
  nestData(data:any, parentCode = null) {
    let nestedData: any[] = [];

    data.forEach((item:any) => {
      if (item.ParentCode === parentCode) {
        let children = this.nestData(data, item.Code);

        if (children.length) {
          item.children = children;
        } else {
          item.children = []
        }

        item.check = false;
        item.display = false;

        nestedData.push(item);
      }
    });
    return nestedData;
  }


}
