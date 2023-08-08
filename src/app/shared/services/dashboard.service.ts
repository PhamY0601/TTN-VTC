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
              name_display: 'Bản tin âm thanh',
              icon: "document",
              id: 3
            })
            break;
          case 'Agency':
            totalData.push({
              name: item.name,
              total: item.total,
              name_display: 'Nhà cung cấp',
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

    let speaker_off_devices: any[] = [];
    let speaker_establish_devices:  any[] = [];
    let speaker_on_devices: any[] = [];
    let video_establish_devices: any[] = [];
    let video_onl_devices: any[] = [];
    let video_off_devices: any[] = [];
    let transmitter_onl_devices : any[] = [];
    let transmitter_off_devices: any[] = [];
    let transmitter_establish_devices: any[] = [];
    let agencyName;
    let createDate;

    data.forEach((device: any) => {

      if (device.type === "AudioBox") {
        switch (device.STATUS) {
          case "0":
            speaker_off += device.total;
            speaker_off_devices.push(device.deviceId)
            break;

          case "1":
            speaker_on += device.total;
            speaker_on_devices.push(device.deviceId)
            break;

          case "2":
            speaker_establish += device.total;
            speaker_establish_devices.push(device.deviceId)
            break;

          case null:
            speaker_off += device.total;
            speaker_off_devices.push(device.deviceId)
        }

      }

      if (device.type === "Transmiter") {
        switch (device.STATUS) {
          case "0":
            transmitter_off += device.total;
            transmitter_off_devices.push(device.deviceId)
            break;

          case "1":
            transmitter_onl += device.total
            transmitter_onl_devices.push(device.deviceId)
            break;

          case "2":
            transmitter_establish += device.total;
            transmitter_establish_devices.push(device.deviceId)
            break;
        }
      }
      if (device.type === "MediaBox") {
        switch (device.STATUS) {
          case "0":
            video_off += device.total;
            video_off_devices.push(device.deviceId)
            break;

          case "1":
            video_onl += device.total
            video_onl_devices.push(device.deviceId)
            break;

          case "2":
            video_establish += device.total;
            video_establish_devices.push(device.deviceId)
            break;
        }
      }

      province = device.provinceName;
      district = device.districtName;
      ward = device.wardName;
      provinceCode = device.provinceCode;
      districtCode = device.districtCode;
      wardCode = device.wardCode;
      agencyName = device.agencyName;
      createDate = device.createDate;
    });
    return  {
      province: province,
      district: district,
      ward: ward,
      provinceCode: provinceCode,
      districtCode: districtCode,
      wardCode: wardCode,
      speaker_off: (speaker_off >= 1 && speaker_off <=9) ? '0' + speaker_off : speaker_off,
      speaker_establish: (speaker_establish >= 1 && speaker_establish <=9) ? '0' + speaker_establish : speaker_establish,
      speaker_on: (speaker_on >= 1 && speaker_on <=9) ? '0' + speaker_on : speaker_on,
      video_onl: (video_onl  >= 1 && video_onl<=9) ? '0' + video_onl : video_onl,
      video_establish: (video_establish >= 1 && video_establish<=9) ? '0' +video_establish : video_establish,
      video_off: (video_off>= 1 && video_off<=9) ? '0' + video_off: video_off,
      transmitter_onl: (transmitter_onl>= 1 && transmitter_onl<=9) ? '0' + transmitter_onl : transmitter_onl,
      transmitter_off: (transmitter_off>= 1 && transmitter_off<=9) ? '0' + transmitter_off : transmitter_off,
      transmitter_establish: (transmitter_establish>= 1 && transmitter_establish<=9) ? '0' + transmitter_establish : transmitter_establish,

      speaker_off_devices: speaker_off_devices,
      speaker_establish_devices: speaker_establish_devices,
      speaker_on_devices: speaker_on_devices,
      video_onl_devices: video_onl_devices,
      video_establish_devices: video_establish_devices,
      video_off_devices: video_off_devices,
      transmitter_onl_devices: transmitter_onl_devices,
      transmitter_off_devices: transmitter_off_devices,
      transmitter_establish_devices: transmitter_establish_devices,
      agencyName: agencyName,
      createDate: createDate
    }
  }

}
