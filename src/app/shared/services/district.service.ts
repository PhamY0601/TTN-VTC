import {Injectable} from '@angular/core';
import {combineLatestAll, forkJoin, map, observable, Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {API} from "../../helper/api";


@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  formData: any = new FormData();
  loudspeaker = this.http.post(`${API.IPPBXEXTEN_URL}`, this.formData) //loa
  inforboard = this.http.post(`${API.INFORBOARD_URL}`, this.formData); //bản tin điện tử
  radioStream = this.http.post(`${API.RADIOSTREAM_URL}`, this.formData); //bản tin phát hành
  radionode = this.http.post(`${API.RADIONODE_URL}`, this.formData); //Nhà cung cấp
  playStream = this.http.post(`${API.PLAYSTREAM_URL}`, this.formData) //bản tin đang phát

  constructor(private http: HttpClient) {
    this.loadFormData()
  }

  loadFormData() {
    this.formData.append("user", "vtc");
    this.formData.append("userKey", "D3sQlzacZKLQXf221XOHPJ5uwyPfyPBM");
  }

  getOverView(city: any, district: any): Observable<any> {
    return forkJoin([this.loudspeaker, this.inforboard, this.radioStream, this.radionode]).pipe(
      map(((res) => {

          let res0 = this.getDistrict(res[0], city, district)
          let res2 = Object.values(res[2]).filter((item) => item.status === "RS03" && item.district === district);
          let res3 = Object.values(res[3]).filter((item) => item.province === city && item.districId === district);

          return [{
            "id": 0,
            "title": "Loa",
            "count": res0.length,
            "icon": "speaker"
          },
            {
              "id": 1,
              "title": "Bản tin điện tử",
              "count": Object.keys(res[1]).length,
              "icon": "youtube"
            },
            {
              "id": 2,
              "title": "Bản tin phát hành",
              "count": res2.length,
              "icon": "youtube",
            },
            {
              "id": 4,
              "title": "Nhà cung cấp",
              "count": res3.length,
              "icon": "supplier"
            }
          ]
        }
      )));
  }

//bản tin đang phát
  getNews(city: any, district: any): Observable<any> {
    return this.radioStream.pipe(
      map((res) => {
        let result = Object.values(res).filter((item) => item.city === city && item.status === "RS03" && item.district === district);
        return result
      })
    );
  }


  getDeviceStatus(city: any, district: any): Observable<any> {
    return forkJoin([this.loudspeaker, this.inforboard]).pipe(
      map(((res) => {
          let res0 = this.getDistrict(res[0], city, district)
          return [{
            "id": 0,
            "title": "Loa",
            "count": res0.length,

          },
            {
              "id": 1,
              "title": "Bản tin điện tử",
              "count": Object.keys(res[1]).length,
            },

          ]
        }
      )));
  }


  groupBy(list: any, property: any) {
    return list.reduce((groups: any, item: any) => {
      const val = item[property];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }


  getDistrict(data: Object, city: any, district: any) {
    return Object.values(data).filter((item) => item.city === city && item.district === district);
  }


  getInfoDistrict(city: any, district: any): Observable<any> {
    let arr: any[] = [];
    let result: any[] = [];

    return forkJoin([this.loudspeaker, this.inforboard]).pipe(
      map(((res) => {

          //xử lý res0, loa, bộ tiep am
          let res0 = this.getDistrict(res[0], city, district);

          res0.forEach((item) => arr.push(item));
          let group = this.groupBy(arr, 'ward');

          for (let i in group) {
            let value = group[i].length - group[i].filter((item: any) => item.status === "10").length
              -  group[i].filter((item: any) => item.status === "0").length

            result.push({
              ward: i,
              speaker: group[i].length,
              speaker_off: value,
              speaker_establish: group[i].filter((item: any) => item.status === "10").length,
              speaker_on: group[i].filter((item: any) => item.status === "0").length,
              transmitter: group[i].filter((item: any) => item.broadcaster === "1").length,
              video: Object.keys(res[1]).length,
              video_onl: Object.values(res[1]).filter((item) => item.status === "IDLE").length,
              video_off: Object.values(res[1]).filter((item) => item.status !== "IDLE").length,

            })
          }
          return result
        }
      )));
  }
}
