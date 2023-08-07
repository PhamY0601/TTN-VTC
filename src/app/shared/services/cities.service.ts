import {Injectable} from '@angular/core';
import {combineLatestAll, forkJoin, map, observable, Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {API} from "../../helper/api";
import {COUNTRY} from "../../app.constants";


@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  formData: any = new FormData();
  loudspeaker = this.http.post(`${API.IPPBXEXTEN_URL}`, this.formData) //loa
  inforboard = this.http.post(`${API.INFORBOARD_URL}`, this.formData); //bản tin điện tử
  radioStream = this.http.post(`${API.RADIOSTREAM_URL}`, this.formData); //bản tin phát hành
  radionode = this.http.post(`${API.RADIONODE_URL}`, this.formData); //Nhà cung cấp
  playStream = this.http.post(`${API.PLAYSTREAM_URL}`, this.formData); //bản tin đang phát
  radioStreaming = this.http.post(`${API.RADIO_MANAGEMENT_URL}`, this.formData); //phát thanh
  playSchedule = this.http.post(`${API.PLAYSCHEDULE_URL}`, this.formData);
  cities = this.http.post(`${API.CITIES_URL}`, this.formData);
  districts = this.http.post(`${API.DISTRICTS_URL}`, this.formData);
  wards = this.http.post(`${API.WARDS_URL}`, this.formData);

  constructor(private http: HttpClient) {
    this.loadFormData()
  }

  loadFormData() {
    this.formData.append("user", "vtc");
    this.formData.append("userKey", "D3sQlzacZKLQXf221XOHPJ5uwyPfyPBM");
  }

  //lấy tổng quan 4 loại: loa,bản tin điện tử, bản tin phát hành, NCC
  getOverView(city: any): Observable<any> {
    return forkJoin([this.loudspeaker, this.inforboard, this.radioStream, this.radionode]).pipe(
      map(((res) => {

          let res0 = this.getCity(res[0], city)
          let res2 = Object.values(res[2]).filter((item) => item.status === "RS03" && item.city === city);
          let res3 = Object.values(res[3]).filter((item) => item.province === city);
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
              "icon": "document",
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
  getNews(city: any): Observable<any> {
    return this.radioStream.pipe(
      map((res) => {
        let result = Object.values(res).filter((item) => item.status === "RS03" && item.city === city)
        return result
      })
    );
  }

  //thống kê loại bản tin
  getPlayStreams(): Observable<any> {
    return this.playStream.pipe(
      map((res) => {
        let arr = Object.values(res);
        let groups = arr.reduce((arr, {contentfield}) => {
          arr[contentfield] = (arr[contentfield] || 0) + 1;
          return arr;
        }, {});

        const mergedObject = {
          ...groups, // copy các thuộc tính từ object ban đầu sang object mới
          "null": (groups["null"] || 0) + (groups[""] || 0), // tính tổng giá trị của null và "" và gán vào thuộc tính "null"
        };
        delete mergedObject[""]; // xóa thuộc tính ""

        let result = Object.entries(mergedObject).map(([title, count]) => ({title, count}));
        result.forEach((item: any) => {
          if (item.title === '' || item.title === "null") {
            item.name = "Lĩnh vực khác";
          }
          if (item.title === "ECO") {
            item.name = "Kinh tế";
          }
          if (item.title === "POLI") {
            item.name = "Chính trị";
          }
        })


        return result
      })
    );
  }

  getDeviceStatus(city: any): Observable<any> {
    return forkJoin([this.loudspeaker, this.inforboard]).pipe(
      map(((res) => {
          let res0 = this.getCity(res[0], city)
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

  getInstallInfo(city: any): Observable<any> {
    let arr: any[] = [];
    let result: any[] = [];

    return forkJoin([this.loudspeaker, this.inforboard]).pipe(
      map(((res) => {
          let res0 = this.getCity(res[0], city)
          res0.forEach((item) => arr.push(item));
          let group = this.groupBy(arr, 'district');
          for (let i in group) {
            let value = group[i].length - group[i].filter((item: any) => item.status === "10").length
              - group[i].filter((item: any) => item.status === "0").length
            result.push({
              district: i,
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

  groupBy(list: any, property: any) {
    return list.reduce((groups: any, item: any) => {
      const val = item[property];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }

  getCity(data: Object, city: any) {
    return Object.values(data).filter((item) => item.city === city);
  }


  getSpeakerLocation(city: any): Observable<any> {
    return this.loudspeaker.pipe(
      map((res) => {
        return this.getCity(Object.values(res), city)
      })
    );
  }

  getRadioStreaming(city: any): Observable<any> {
    let arr: any[] = [];
    let result: any[] = [];

    return this.radioStreaming.pipe(
      map((res) => {
        let res0 = this.getCity(res, city);
        res0.forEach((item) => arr.push(item));
        for (let i in arr) {
          result.push({
            id: arr[i].id,
            name: arr[i].name,
            district: arr[i].district,
            ward: arr[i].ward,
            status: arr[i].status,
            url: `http://ics.vtctelecom.com.vn:5000/mediasource_${arr[i].confId}`,
            type: 'Audio',
            pause: false
          })
        }
        return result
      })
    );
  }

  getRadioStreamingDetail(id: any): Observable<any> {
    let arr: any[] = [];
    return forkJoin([this.radioStreaming, this.playSchedule]).pipe(
      map((res) => {
        arr = Object.values(res[0]).filter((item) => item.id === id)
        let a = Object.values(res[1])
          .filter((item) =>
            item.city === arr[0].city && item.district === arr[0].district
            && item.guid === arr[0].rule);
        if (a.length === 0) {
          return {
            id: arr[0].id,
            rule: arr[0].rule,
            district: arr[0].district,
            ward: arr[0].ward,
            status: arr[0].status,
            url: `http://ics.vtctelecom.com.vn:5000/mediasource_${arr[0].confId}`,
            date_from: '',
            date_to: '',
            hour_from: '',
            hour_to: '',
            week_day: '',
            day: '',
            month: '',
            hour_from1: '',
            hour_to1: '',
            c_hour_from2: '',
            c_hour_to2: '',
            c_hour_from3: '',
            c_hour_to3: '',
            c_hour_from4: '',
            c_hour_to4: '',
            c_hour_from5: '',
            c_hour_to5: '',
          }
        } else {
          return {
            id: arr[0].id,
            rule: arr[0].rule,
            district: arr[0].district,
            ward: arr[0].ward,
            status: arr[0].status,
            url: `http://ics.vtctelecom.com.vn:5000/mediasource_${arr[0].confId}`,
            date_from: new Date(),
            date_to: new Date(),
            hour_from: a[0].hour_from,
            hour_to: a[0].hour_to,
            week_day: a[0].week_day.split(',').slice(1, -1).join(','),
            day: a[0].day.split(',').slice(1, -1).join(','),
            month: a[0].month.split(',').slice(1, -1).join(','),
            hour_from1: a[0].hour_from1,
            hour_to1: a[0].hour_to1,
            c_hour_from2: a[0].c_hour_from2,
            c_hour_to2: a[0].c_hour_to2,
            c_hour_from3: a[0].c_hour_from3,
            c_hour_to3: a[0].c_hour_to3,
            c_hour_from4: a[0].c_hour_from4,
            c_hour_to4: a[0].c_hour_to4,
            c_hour_from5: a[0].c_hour_from5,
            c_hour_to5: a[0].c_hour_to5,
          }
        }

      })
    );
  }

  getDistricts(city: any): Observable<any> {
    return this.districts.pipe(
      map((res) => {
        return Object.values(res).filter((item) => item.provinceId === city)
      })
    );
  }

  getWards(districtId: any): Observable<any> {
    return this.wards.pipe(
      map((res) => {
         return Object.values(res).filter((item) => item.districtId === districtId )
        // return Object.values(res)
      })
    );
  }


}
