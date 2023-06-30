import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from "../../helper/api";
import {BehaviorSubject, forkJoin, interval, map, Observable, switchMap, takeUntil, tap} from "rxjs";
import {CitiesService} from "./cities.service";
import {COUNTRY} from "../../app.constants";


@Injectable({
  providedIn: 'root'
})
export class ReportBroadcastTimeService {

  formData: any = new FormData();
  loudspeaker = this.http.post(`${API.IPPBXEXTEN_URL}`, this.formData) //loa
  playSchedule = this.http.post(`${API.PLAYSCHEDULE_URL}`, this.formData);
  radioStreaming = this.http.post(`${API.RADIO_MANAGEMENT_URL}`, this.formData);

  constructor(private http: HttpClient,
              private citiesService: CitiesService
  ) {
    this.loadFormData()
  }

  loadFormData() {
    this.formData.append("user", "vtc");
    this.formData.append("userKey", "D3sQlzacZKLQXf221XOHPJ5uwyPfyPBM");
  }

  reportRoadcastTime(city: any): Observable<any> {
    return forkJoin([this.loudspeaker, this.playSchedule]).pipe(
      map(res => {
          let res0 = this.citiesService.getCity(res[0], city);
          let res1 = this.citiesService.getCity(res[1], city);
          let array: any[] = [];
          res0.forEach((item0: any) => {
            res1.forEach((item1: any) => {
              if (item1.district === item0.district && item1.ward === item0.ward) {
                if (item0.district !== '') {
                  array.push({
                    district: item0.district,
                    ward: item0.ward,
                    dthID: item0.dthID,
                    speakers: Object.values(res0).length,
                    latitude: item0.latitude,
                    longitude: item0.longitude,
                  })
                }
              }
            })
          })
        }
      ));
  }

  roadcastTime(city: any): Observable<any> {
    return forkJoin([this.loudspeaker, this.radioStreaming]).pipe(
      map(res => {
        let res0 = this.citiesService.getCity(res[0], city);
        let res1 = this.citiesService.getCity(res[1], city);
        let array: any[] = [];
        res0.forEach((item0: any) => {
          res1.forEach((item1: any) => {
            if (item1.district === item0.district && item1.ward === item0.ward) {
              if (item0.district !== '') {
                array.push({
                  district: item0.district,
                  ward: item0.ward,
                  playstatus: item0.playstatus,
                  status: item1.status,
                  time: 0
                })
              }
            }
          })
        })
        return array
      })
    )
  }



  test() {
    const timer$ = new BehaviorSubject<number>(0);
    interval(10000)
      .pipe(
        switchMap(() => this.roadcastTime(COUNTRY())),
        tap((data) => {
       timer$.next(timer$.getValue() + 10000);
        })
      )
      .subscribe((data) => {
        // Thực hiện các thao tác trên dữ liệu trả về
        data.forEach((item: any) => {
          if(item.playstatus === '10') {
            item.time = timer$.getValue()
          }
        })

        // In ra giá trị thời gian hiện tại
        console.log('Timer:', timer$.getValue());
      });
  }


}
