import {Injectable} from '@angular/core';
import {map, Observable, switchMap} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {API} from "../../helper/api";
import {LocationsService} from "./locations.service";
import {header} from "../../app.constants";


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private AUTH_TOKEN_KEY = 'token';
  header = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem(this.AUTH_TOKEN_KEY)}`})

  constructor(private http: HttpClient,
              private locationsService$: LocationsService) {
  }


  getScheduleList(): Observable<any> {
    const headers = this.header;
    let districtData: any[] = [];

    this.locationsService$.getAllLocations().subscribe((res: any) => districtData = res.data)

    return this.http.get(`${API.SCHEDULE_LIST_URL}`, {headers}).pipe(map((res: any) => {
      let data = res.data;
      let result: any[] = []

      //duyet qua mang va group theo district
      data.forEach((item: any) => {
        let location = this.formatLocation(districtData, item.Locations)
        result.push({
          id: item.Id,
          title: item.Title,
          locations: location,
          type: item.type_display,
          src_type: item.src_type_display,
          url: item.url,
          agency: item.agency,
          start: item.Start,
          end: item.End,
          h1_start: item.h1_start ? item.h1_start : '',
          h1_end: item.h1_end ? item.h1_end : '',
          h2_start: item.h2_start ? item.h2_start : '',
          h2_end: item.h2_start ? item.h2_start : '',
          h3_start: item.h3_start ? item.h3_start : '',
          h3_end: item.h3_start ? item.h3_start : '',
          h4_start: item.h4_start ? item.h4_start : '',
          h4_end: item.h4_start ? item.h4_start : '',
          h5_start: item.h5_start ? item.h5_start : '',
          h5_end: item.h5_start ? item.h5_start : '',
          h1_field: item.h1_field ? item.h1_field : '',
          h2_field: item.h2_field ? item.h2_field : '',
          h3_field: item.h3_field ? item.h3_field : '',
          h4_field: item.h4_field ? item.h4_field : '',
          h5_field: item.h5_field ? item.h5_field: '',
          repeat_week_day: item.RepeateWeekDay ? item.RepeateWeekDay : '',
          repeat_month_day: item.RepeateMonthDay ? item.RepeateMonthDay : '',
          agencyId: item.agencyId
        })
      })

      return result
    }))
  }

  formatLocation(districtData:any,location:any) {
    let result: any[] = [];
    let locationsArray: any[] = [];
    let district = JSON.parse(location)

    let locationsData: { [key: string]: string[] } = {};
    for (let item of district) {
      let elements = item.split(",");
      let groupKey = elements[1];
      let value = elements[2];
      if (!locationsData[groupKey]) {
        locationsData[groupKey] = [];
      }
      locationsData[groupKey].push(value);
    }

    locationsArray = Object.entries(locationsData).map(([key, wards]) => ({key, wards, display: false}));

    let districtName: string;
    let wardName: any[] = [];

    locationsArray.forEach((district:any) => {
      districtData.forEach((loc:any) => {

        if(district.key === loc.Code) {
          districtName = loc.Name
        }

        district.wards.forEach((ward: any) =>{
          if(ward === loc.Code) {
            wardName.push(loc.Name)
          }
        })
      })

      result.push({
        district: districtName,
        wards: wardName
      })

    })
    return result
  }


  getScheduleDetail(id:any): Observable<any> {
    const headers = header;

    return this.http.get(`${API.SCHEDULE_DETAIL_URL }${id}`, { headers }).pipe(
      switchMap((res: any) => {
        const item = res.data[0];

        return this.locationsService$.getAllLocations().pipe(
          map((res: any) => {
            const districtData = res.data;
            const location = this.formatLocation(districtData, item.Locations);

            return {
              id: item.Id,
              title: item.Title,
              locations: location,
              start: item.Start,
              end: item.End,
              h1_start: item.h1_start ? item.h1_start : '',
              h1_end: item.h1_end ? item.h1_end : '',
              h2_start: item.h2_start ? item.h2_start : '',
              h2_end: item.h2_start ? item.h2_start : '',
              h3_start: item.h3_start ? item.h3_start : '',
              h3_end: item.h3_start ? item.h3_start : '',
              h4_start: item.h4_start ? item.h4_start : '',
              h4_end: item.h4_start ? item.h4_start : '',
              h5_start: item.h5_start ? item.h5_start : '',
              h5_end: item.h5_start ? item.h5_start : '',
              h1_field: item.h1_field ? item.h1_field : '',
              h2_field: item.h2_field ? item.h2_field : '',
              h3_field: item.h3_field ? item.h3_field : '',
              h4_field: item.h4_field ? item.h4_field : '',
              h5_field: item.h5_field ? item.h5_field : '',
              repeat_week_day: item.RepeateWeekDay ? item.RepeateWeekDay : '',
              repeat_month_day: item.RepeateMonthDay ? item.RepeateMonthDay : '',
            };
          })
        );
      })
    );
  }

}

