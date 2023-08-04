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

 //danh sách lịch phát
  getScheduleList(): Observable<any> {
    const headers = this.header;
    let districtData: any[] = [];

    this.locationsService$.getAllLocations().subscribe((res: any) => districtData = res.data)

    return this.http.get(`${API.SCHEDULE_LIST_URL}`, {headers}).pipe(map((res: any) => {
      let data = res.data;
      let scheduleGroup = this.groupByProperty(data, 'Id');
      let schedule: any[] = [];

      Object.values(scheduleGroup).forEach((item:any) => {
        let agencies: any[] = [];

        item.forEach((value:any) => {
          agencies.push(value.agency)
        })

        schedule.push({
          id: item[0].Id,
          title: item[0].Title,
          agency: agencies,
          type: item[0].type_display,
          start: item[0].Start,
          end: item[0].End,
          url: item[0].url
        })

      })

      return schedule
    }))
  }

  //khu vuc phát
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
    let districtCode: string;
    let wardName: any[] = [];

    locationsArray.forEach((district:any) => {
      districtData.forEach((loc:any) => {

        if(district.key === loc.Code) {
          districtName = loc.Name
          districtCode = loc.Code
        }

        district.wards.forEach((ward: any) =>{
          if(ward === loc.Code) {
            wardName.push({wardName: loc.Name, wardCode: loc.Code})
          }
        })
      })

      result.push({
        district: districtName,
        districtCode: districtCode,
        wards: wardName
      })

    })
    return result
  }

//chi tiết lịch phát
  getScheduleDetail(id:any): Observable<any> {
    const headers = header;

    return this.http.get(`${API.SCHEDULE_DETAIL_URL }${id}`, { headers }).pipe(
      switchMap((res: any) => {
        const item = res.data[0];

        return this.locationsService$.getAllLocations().pipe(
          map((res: any) => {
            let districtData = res.data;
            let location = this.formatLocation(districtData, item.Locations);
            let src_param = JSON.parse(item.Src_Params);

            return {
              id: item.Id,
              title: item.Title,
              locations: location,
              start: item.Start,
              end: item.End,
              h1_start: item.h1_start ? item.h1_start.slice(0,-3) : '',
              h1_end: item.h1_end ? item.h1_end.slice(0,-3) : '',
              h2_start: item.h2_start ? item.h2_start.slice(0,-3) : '',
              h2_end: item.h2_end ? item.h2_end.slice(0,-3) : '',
              h3_start: item.h3_start ? item.h3_start : '',
              h3_end: item.h3_end ? item.h3_end.slice(0,-3) : '',
              h4_start: item.h4_start ? item.h4_start : '',
              h4_end: item.h4_end ? item.h4_end.slice(0,-3) : '',
              h5_start: item.h5_start ? item.h5_start : '',
              h5_end: item.h5_end ? item.h5_end.slice(0,-3) : '',
              h1_field: item.h1_field ? item.h1_field : '',
              h2_field: item.h2_field ? item.h2_field : '',
              h3_field: item.h3_field ? item.h3_field : '',
              h4_field: item.h4_field ? item.h4_field : '',
              h5_field: item.h5_field ? item.h5_field : '',
              repeat_week_day: item.RepeatWeekDay ? JSON.parse(item.RepeatWeekDay) : [],
              repeat_month_day: item.RepeatMonthDay ? JSON.parse(item.RepeatMonthDay) : [],
              repeat_month_year: item.RepeatMonthYear ? JSON.parse(item.RepeatMonthYear) : [],
              src_param: src_param.text
            };
          })
        );
      })
    );
  }


  groupByProperty(list: any[], property: string) {
    return list.reduce((groups: any, item: any) => {
      const key = item[property];
      (groups[key] = groups[key] || []).push(item);
      return groups;
    }, {});
  }

}

