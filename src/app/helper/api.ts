import {environment} from "src/environments/environment";

export class API {
  public static IPPBXEXTEN_URL = `${environment.apiUrl}Ippbxextenlocation`;  //loa
  public static INFORBOARD_URL = `${environment.apiUrl}Inforboard`; //bản tin điện tử
  public static RADIOSTREAM_URL = `${environment.apiUrl}Radiostreamingactivity`; //bản tin phát hành
  public static RADIONODE_URL = `${environment.apiUrl}Radionode`; //nhà cung cấp
  public static PLAYSTREAM_URL = `${environment.apiUrl}Playstreams`; //loại bản tin
  public static RADIOSTREAMING_URL = `${environment.apiUrl}Radiostreaming`; //quản lý phát thanh
  public static PLAYSCHEDULE_URL = `${environment.apiUrl}Playschedule`; //lập lịch làm việc
  public static DISTRICTS_URL = `${environment.apiUrl}Districts`; //quận
  public static WARDS_URL = `${environment.apiUrl}Wards`; //xã

}
