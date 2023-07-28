export interface IRadioManagement {
  id?: any, //id huyện
  district?: string,
  ward?: string,
  start?: string;
  end?: string;
  h1_start?: string;
  h1_end?: string;
  h2_start?: string;
  h2_end?: string;
  h3_start?: string;
  h3_end?: string;
  h4_start?: string;
  h4_end?: string;
  h5_start?: string;
  h5_end?: string;
  h1_field?: string;
  h2_field?: string;
  h3_field?: string;
  h4_field?: string;
  h5_field?: string;
  repeat_week_day?: string;
  hrepeat_h3_start_day?: string;
  repeat_month_year?:string;
}

export class RadioManagement implements IRadioManagement {
  constructor(
    public id?: any,
    public district?: string,
    public ward?: string,
    public start?: string,
    public end?: string,
    public h1_start?: string,
    public h1_end?: string,
    public h2_start?: string,
    public h2_end?: string,
    public h3_start?: string,
    public h3_end?: string,
    public h4_start?: string,
    public h4_end?: string,
    public h5_start?: string,
    public h5_end?: string,
    public h1_field?: string,
    public h2_field?: string,
    public h3_field?: string,
    public h4_field?: string,
    public h5_field?: string,
    public repeat_week_day?: string,
    public repeat_month_day?: string,
    public repeat_month_year?:string,
  ) {
    this.id = id ? id : null;
    this.district = district ? district : '';
    this.ward = ward ? ward : '';
    this.start = start ? start : '';
    this.end = end ? end : '';
    this.h1_start = h1_start ? h1_start : '';
    this.h1_end = h1_end ? h1_end : '';
    this.h2_start = h2_start ? h2_start : '';
    this.h2_end = h2_end ? h2_end : '';
    this.h3_start = h3_start ? h3_start : '';
    this.h3_end = h3_end ? h3_end : '';
    this.h4_start = h4_start ? h4_start : '';
    this.h4_end = h4_end ? h4_end : '';
    this.h5_start = h5_start ? h5_start : '';
    this.h5_end = h5_end ? h5_end : '';
    this.h1_field = h1_field ? h1_field : '';
    this.h2_field = h2_field ? h2_field : '';
    this.h3_field = h3_field ? h3_field : '';
    this.h4_field = h4_field ? h4_field : '';
    this.h5_field = h5_field ? h5_field : '';
    this.repeat_week_day = repeat_week_day ? repeat_week_day : '';
    this.repeat_month_day = repeat_month_day ? repeat_month_day : '';
    this.repeat_month_year = repeat_month_year ? repeat_month_year : ''
  }
}
