import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {API} from "../../helper/api";


@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  private AUTH_TOKEN_KEY = 'token';
  header = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem(this.AUTH_TOKEN_KEY)}`})

  constructor(private http: HttpClient) {
  }


  getInstall(): Observable<any> {
    const headers = this.header;
    return this.http.get(`${API.INSTALLATION_URL}`, {headers}).pipe(map((res: any) => {
      let array = res.data;
      let deviceTotalData: any[] = [];
      let devicePositionData: any[] = [];
      let deviceInstallData: any[] = [];
      let result: any[] = [];

      this.getData(array, 'device_total').forEach((item: any) => {
        deviceTotalData.push({
          title: item.type_display,
          count: item.total,
          type: item.type
        })
      })

      let arrayInstall: any[] = [];
      this.getData(array, 'district_total').forEach((item: any) => {
        arrayInstall.push(item)
      })
      const groupedInstallations = arrayInstall.reduce((acc, cur) => {
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

      Object.values(groupedInstallations).forEach((group: any) => {
        let audio: any = '';
        let total_audio: any = 0;
        let audio_display: any = 'Cụm loa';
        let transmitter: any = '';
        let total_transmitter: any = 0;
        let transmitter_display: any = "Bộ tiếp âm";
        let video: any = '';
        let total_video: any = 0;
        let video_display: any = "Bản tin điện tử";
        let province: any;
        let district: any
        let status: any;

        group.forEach((installation: any) => {
          if (installation.type === "AudioBox") {
            audio = installation.type;
            total_audio = installation.total;
            audio_display = installation.type_display;
            province = installation.provinceCode;
            district = installation.district;
            status = installation.status
          }
          if (installation.type === "Transmiter") {
            transmitter = installation.type;
            total_transmitter = installation.total;
            transmitter_display = installation.type_display;
            province = installation.provinceCode;
            district = installation.district;
            status = installation.status
          }

          if (installation.type === "MediaBox") {
            video = installation.type;
            total_video = installation.total;
            video_display = installation.type_display;
            province = installation.provinceCode;
            district = installation.district;
            status = installation.status
          }
        });

        deviceInstallData.push({
          audio: audio,
          total_audio: total_audio,
          audio_display: audio_display,
          transmitter: transmitter,
          total_transmitter: total_transmitter,
          transmitter_display: transmitter_display,
          video: video,
          total_video: total_video,
          video_display: video_display,
          province: province,
          district: district
        })
      });



      this.getData(array, 'device_positions').forEach((item: any) => {
        devicePositionData.push({
          city: item.province,
          city_code: item.ProvinceCode,
          district_code: item.DistrictCode,
          district: item.district,
          ward: item.ward,
          latitude: item.Lat,
          longitude: item.Lng,
          type: item.status_display,
          // type: item.type_display,
          date: item.CreatedDate,
          status: item.Status
        })
      })

      result.push({name: 'device_total', value: deviceTotalData});
      result.push({name: 'device_positions', value: devicePositionData})
      result.push({name:'device_install', value: deviceInstallData})
      return result
    }));


  }

  getData(array: any, name: string): any {
    for (let i in array) {
      if (array[i].name === name) {
        return array[i].value
      }
    }

  }


}
