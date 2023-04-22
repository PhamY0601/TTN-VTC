export interface IRadioManagement {
  id?: any, //id huyện
  district?: string,
  ward?: string,
  status?: string,
  url?: string;
  date_from?: string;
  date_to?: string;
  hour_from?: string;
  hour_to?: string;
  week_day?: string;
  day?: string;
  month?: string;
  hour_from1?: string;
  hour_to1?: string;
  c_hour_from2?: string;
  c_hour_to2?: string;
  c_hour_from3?: string;
  c_hour_to3?: string;
  c_hour_from4?: string;
  c_hour_to4?: string;
  c_hour_from5?: string;
  c_hour_to5?: string;

}

export class RadioManagement implements IRadioManagement {
  constructor(
    public id?: any,
    public district?: string,
    public ward?: string,
    public status?: string,
    public url?: string,
    public date_from?: string,
    public date_to?: string,
    public hour_from?: string,
    public hour_to?: string,
    public week_day?: string,
    public day?: string,
    public month?: string,
    public hour_from1?: string,
    public hour_to1?: string,
    public c_hour_from2?: string,
    public c_hour_to2?: string,
    public c_hour_from3?: string,
    public c_hour_to3?: string,
    public c_hour_from4?: string,
    public c_hour_to4?: string,
    public c_hour_from5?: string,
    public c_hour_to5?: string,
  ) {
    this.id = id ? id : null;
    this.district = district ? district : '';
    this.ward = ward ? ward : '';
    this.status = status ? status : '';
    this.url = url ? url : '';
    this.date_from = date_from ? date_from : '';
    this.date_to = date_to ? date_to : '';
    this.hour_from = hour_from ? hour_from : '';
    this.hour_to = hour_to ? hour_to : '';
    this.week_day = week_day ? week_day : '';
    this.day = day ? day : '';
    this.month = month ? month : '';
    this.hour_from1 = hour_from1 ? hour_from1 : '';
    this.hour_to1 = hour_to1 ? hour_to1 : '';
    this.c_hour_from2 = c_hour_from2 ? c_hour_from2 : '';
    this.c_hour_to2 = c_hour_to2 ? c_hour_to2 : '';
    this.c_hour_from3 = c_hour_from3 ? c_hour_from3 : '';
    this.c_hour_to3 = c_hour_to3 ? c_hour_to3 : '';
    this.c_hour_from4 = c_hour_from4 ? c_hour_from4 : '';
    this.c_hour_to4 = c_hour_to4 ? c_hour_to4 : '';
    this.c_hour_from5 = c_hour_from5 ? c_hour_from5 : '';
    this.c_hour_to5 = c_hour_to5 ? c_hour_to5 : '';

  }
}
