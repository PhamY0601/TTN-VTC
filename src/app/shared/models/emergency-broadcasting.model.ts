export interface IEmergencyBroadcasting {
  id?: any;
  title?: string;
  content?: string;
  start?: string;
  end?:string;
  locations?: any[];
  src_type?: string,
  src_params?: string

}
export class EmergencyBroadcast implements IEmergencyBroadcasting {
  constructor(
    public id?: any,
    public title?: string,
    public content?: string,
    public start?: string,
    public end?:string,
    public locations?: any[],
    public src_type?: string,
    public src_params?: string
  ) {
    this.id = id ? id : null;
    this.title = title ? title : '';
    this.content = content ? content : '';
    this.start = start ? start : '00:00';
    this.end = end ? end : '23:59';
    this.locations = locations ? locations : [];
    this.src_type = src_type ? src_type : '';
    this.src_params = src_params ? src_params : '';
  }
}

export interface ISrcParams {
  text?: string;
  audio_format?: string;
  region?: string;
  speed?: number
}
export class SrcParams implements ISrcParams {
  constructor(
    public text?: string,
    public audio_format?: string,
    public region?: string,
    public speed?: number,

  ) {
    this.text = text ? text : '';
    this.audio_format = audio_format ? audio_format : undefined;
    this.region = region ? region : undefined;
    this.speed = speed ? speed : undefined;

  }
}
