import {Injectable} from '@angular/core';
import {combineLatestAll, map, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {API} from "../../helper/api";
import {group} from "@angular/animations";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private AUTH_TOKEN_KEY = 'token';
  header = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem(this.AUTH_TOKEN_KEY)}`})

  constructor(private http: HttpClient) {
  }


  getTotal(): Observable<any> {
    const headers = this.header;
    return this.http.get(`${API.DASHBOARD_URL}`, {headers}).pipe(map((res: any) => {
      let array = res.data;
      let totalData: any[] = [];
      let recordData: any[] = [];
      let fieldData: any[] = [];
      let deviceData: any[] = [];
      let result: any[] = [];

      this.getData(array, 'total').forEach((item: any) => {
        switch (item.name) {

          case 'AudioBox':
            totalData.push({
              name: item.name,
              total: item.total,
              name_display: 'Loa',
              icon: "speaker",
              id: 1
            })
            break;
          case 'MediaBox':
            totalData.push({
              name: item.name,
              total: item.total,
              name_display: 'Bản tin điện tử',
              icon: "youtube",
              id: 2
            })
            break;
          case 'Record':
            totalData.push({
              name: item.name,
              total: item.total,
              name_display: 'Bản tin phát hành',
              icon: "document",
              id: 3
            })
            break;
          case 'Agency':
            totalData.push({
              name: item.name,
              total: item.total,
              name_display: 'Trạm phát',
              icon: "supplier",
              id: 4
            })
            break;
        }
      })

      this.getData(array, 'record_active').forEach((item: any) => {

        const substringToRemove = "http://localhost:57088/ttn_/";
        let resultURL: string;

        if (item.Uri.startsWith("http://localhost:57088/ttn_/")) {
          resultURL = API.AUDIO_URL + item.Uri.replace(substringToRemove, "");
        } else {
          resultURL = item.Uri
        }

        let content = item.content ? JSON.parse(item.content) : ''


        recordData.push({
          id: item.Id,
          title: item.Title,
          province: item.province,
          district: item.district,
          ward: item.ward,
          date: item.ActivedDate,
          starttime: item.Start,
          endtime: item.End,
          url: resultURL,
          field: item.field_display,
          content: item.content ? content.text : content
        })
      })


      this.getData(array, 'record_field').forEach((item: any) => {
        fieldData.push({
          name: item.field_display,
          field: item.field,
          count: item.total
        })
      })

      let arrayDevice: any[] = [];
      this.getData(array, 'device_status').forEach((item: any) => {
        arrayDevice.push(item)
      })

      //nhóm theo district
      let groupedByDistrict = this.groupByProperty(arrayDevice, 'districtCode')

      //tạo mảng mới chứa mã district và tat cả ward
      let groupedByDistrictArray = Object.entries(groupedByDistrict).map(([district, wards]) => ({district, wards}));

      // dem device theo district
      Object.values(groupedByDistrict).forEach((group: any) => {
        deviceData.push(this.countDevice(group))
      });

      result.push({name: 'total', value: totalData});
      result.push({name: 'record_active', value: recordData});
      result.push({name: 'record_field', value: fieldData});
      result.push({name: 'device_status', value: deviceData});
      result.push({name: 'device_status_district', value:  groupedByDistrictArray})
      return result
    }));


  }

  getData(array: any, name: string): any {
    for (let i in array) {
      if (array[i].name === name) {
        if (array[i].value === null || array[i].value === 'null') {
          return []
        }
        return array[i].value
      }
    }
  }

  groupByProperty(list: any[], property: string) {
    return list.reduce((groups: any, item: any) => {
      const key = item[property];
      (groups[key] = groups[key] || []).push(item);
      return groups;
    }, {});
  }

  getDetailDevice(data:any, districtCode:any) {

    let result: any[] = []
    let dataByDistrict = data.filter((item:any) => item.district === districtCode)

    let wards = dataByDistrict[0].wards
    let groupByWard = this.groupByProperty(wards, 'wardCode')
    let groupByWardArray = Object.entries(groupByWard).map(([wardCode, wardData]) => ({wardCode, wardData}));

    groupByWardArray.forEach((wards:any) => {
     result.push(this.countDevice(wards.wardData))
    })
    return result
  }


  countDevice(data:any[]):any {
    let province: any = '';
    let district: any = '';
    let ward: any = '';
    let provinceCode: any = '';
    let districtCode: any = '';
    let wardCode: any = '';
    let speaker_off = 0;
    let speaker_establish = 0;
    let speaker_on = 0;
    let video_establish = 0;
    let video_onl = 0;
    let video_off = 0;
    let transmitter_onl = 0;
    let transmitter_off = 0;
    let transmitter_establish = 0;

    data.forEach((device: any) => {

      if (device.type === "AudioBox") {
        switch (device.STATUS) {
          case "0":
            speaker_off += device.total;
            break;

          case "1":
            speaker_on += device.total;
            break;

          case "2":
            speaker_establish += device.total;
            break;

          case null:
            speaker_off += device.total;
        }
      }

      if (device.type === "Transmiter") {
        switch (device.STATUS) {
          case "0":
            transmitter_off += device.total;
            break;

          case "1":
            transmitter_onl += device.total
            break;

          case "2":
            transmitter_establish += device.total;
            break;
        }
      }
      if (device.type === "MediaBox") {
        switch (device.STATUS) {
          case "0":
            video_off += device.total;
            break;

          case "1":
            video_onl += device.total
            break;

          case "2":
            video_establish += device.total;
            break;
        }
      }

      province = device.provinceName;
      district = device.districtName;
      ward = device.wardName;
      provinceCode = device.provinceCode;
      districtCode = device.districtCode;
      wardCode = device.wardCode;
    });
    return  {
      province: province,
      district: district,
      ward: ward,
      provinceCode: provinceCode,
      districtCode: districtCode,
      wardCode: wardCode,
      speaker_off: speaker_off,
      speaker_establish: speaker_establish,
      speaker_on: speaker_on,
      video_onl: video_onl,
      video_establish: video_establish,
      video_off: video_off,
      transmitter_onl: transmitter_onl,
      transmitter_off: transmitter_off,
      transmitter_establish: transmitter_establish
    }
  }

}
