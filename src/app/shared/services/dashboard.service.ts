import {Injectable} from '@angular/core';
import {combineLatestAll, map, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {API} from "../../helper/api";


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
          case 'Agency':
            totalData.push({
              name: item.name,
              total: item.total,
              name_display: 'Nhà cung cấp',
              icon: "supplier"
            })
            break;
          case 'AudioBox':
            totalData.push({
              name: item.name,
              total: item.total,
              name_display: 'Loa',
              icon: "speaker"
            })
            break;
          case 'MediaBox':
            totalData.push({
              name: item.name,
              total: item.total,
              name_display: 'Bản tin điện tử',
              icon: "youtube"
            })
            break;
          case 'Record':
            totalData.push({
              name: item.name,
              total: item.total,
              name_display: 'Bản tin phát hành',
              icon: "document"
            })
            break;
        }
      })

      this.getData(array, 'record_active').forEach((item: any) => {
        recordData.push({
          title: item.Title,
          province: item.province,
          district: item.district,
          ward: item.ward,
          date: item.ActivedDate,
          starttime: item.Start,
          endtime: item.End
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
      const groupedDevice = arrayDevice.reduce((acc, cur) => {
        let key: any
        if (cur.districtCode === '') {
          key = `${cur.provinceCode}`;
        } else {
          key = `${cur.provinceCode}-${cur.districtCode}`;
        }
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(cur);
        return acc;
      }, {});

      Object.values(groupedDevice).forEach((group: any) => {

        let province: any = '';
        let district: any = '';
        let speaker_off = 0;
        let speaker_establish = 0;
        let speaker_on = 0;
        let video_establish = 0;
        let video_onl = 0;
        let video_off = 0;
        let transmitter_onl = 0;
        let transmitter_off = 0;
        let transmitter_establish = 0;

        group.forEach((device: any) => {

          if (device.type === "AudioBox") {
            province = device.provinceName;
            district = device.districtName;
            switch (device.STATUS) {
              case "0":
                speaker_off = device.total;
                break;
              case "1":
                speaker_on = device.total;
                break;
              case "2":
                speaker_establish = device.total;
                break;
              case null:
                speaker_off = device.total;
            }


          }
          if (device.type === "Transmiter") {
            province = device.provinceName;
            district = device.districtName

            switch (device.STATUS) {

              case "0":
                transmitter_off = device.total;
                break;
              case "1":
                transmitter_onl = device.total
                break;
              case "2":
                transmitter_establish = device.total;
                break;
            }
          }
          if (device.type === "MediaBox") {
            province = device.provinceName;
            district = device.districtName

            switch (device.STATUS) {
              case "0":
                video_off = device.total;
                break;
              case "1":
                video_onl = device.total
                break;
              case "2":
                video_establish = device.total;
                break;
            }
          }
        });

        deviceData.push({
          province: province,
          district: district,
          speaker_off: speaker_off,
          speaker_establish: speaker_establish,
          speaker_on: speaker_on,
          video_onl: video_onl,
          video_establish: video_establish,
          video_off: video_off,
          transmitter_onl: transmitter_onl,
          transmitter_off: transmitter_off,
          transmitter_establish: transmitter_establish
        })
      });

      result.push({name: 'total', value: totalData});
      result.push({name: 'record_active', value: recordData});
      result.push({name: 'record_field', value: fieldData});
      result.push({name: 'device_status', value: deviceData})
      return result
    }));


  }

  getData(array: any, name: string): any {
    for (let i in array) {
      if (array[i].name === name) {
        if(array[i].value === null || array[i].value === 'null' ) {
          return []
        }
        return array[i].value
      }
    }


  }


}
