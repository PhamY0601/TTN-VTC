import {environment} from "src/environments/environment";

export class API {
  public static IPPBXEXTEN_URL = `${environment.apiUrl}lookups/model/Ippbxextenlocation`;  //loa
  public static INFORBOARD_URL = `${environment.apiUrl}lookups/model/Inforboard`; //bản tin điện tử
  public static RADIOSTREAM_URL = `${environment.apiUrl}lookups/model/Radiostreamingactivity`; //bản tin phát hành
  public static RADIONODE_URL = `${environment.apiUrl}lookups/model/Radionode`; //Nhà cung cấp
  public static PLAYSTREAM_URL = `${environment.apiUrl}lookups/model/Playstreams`; //loại bản tin
  public static RADIO_MANAGEMENT_URL = `${environment.apiUrl}api/common/get?action=danhsachlichphat`; //quản lý lịch phát thanh
  public static PLAYSCHEDULE_URL = `${environment.apiUrl}lookups/model/Playschedule`; //lập lịch làm việc
  public static DISTRICTS_URL = `http://ttn.vtctelecom.com.vn/index.php/api/lookups/model/Districts`; //quận
  public static WARDS_URL = `http://ttn.vtctelecom.com.vn/index.php/api/lookups/model/Wards`; //xã
  public static CITIES_URL = `${environment.apiUrl}lookups/model/Provinces`; //xã
  public static FIELDSOURCE_URL = `${environment.apiUrl}api/common/get?action=uri_field`; //TNN theo lĩnh vực
  public static GEOGRAPHICSOURCE_URL = `${environment.apiUrl}api/common/get?action=geographic`; //TTN theo địa lý
  public static WARNINGCONTENT_URL = `${environment.apiUrl}api/common/get?action=warningcontent`; //Cảnh báo từ khóa
  public static REGISTRATIONCONTENT_URL = `${environment.apiUrl}api/common/get?action=registrationcontent`; //Đăng ký nội dung
  public static EDITORIALCONTENT_URL = `${environment.apiUrl}_data/EditorialContent`;
  public static DASHBOARD_URL = `${environment.apiUrl}api/common/get?action=dashboard`;
  public static INSTALLATION_URL = `${environment.apiUrl}api/common/get?action=installation`;
  public static LOGIN_URL = `${environment.apiUrl}api/account/Login`;
  public static POST_EMERGENCYBROADCASTING_URL = `${environment.apiUrl}api/app/addSosRecord`
  public static EMERGENCYBROADCASTING_URL = `${environment.apiUrl}api/common/get?action=emergency_audio`;
  public static EMERGENCYBROADCASTING_DETAIL_URL =  `${environment.apiUrl}api/common/get?action=emergency_audio_details&id=`;
  public static AUDIO_URL = `${environment.apiUrl}ttn_/tts/`;
  public static LOCATIONS_URL = `${environment.apiUrl}api/common/get?action=locations`;
  public static SCHEDULE_LIST_URL = `${environment.apiUrl}api/common/get?action=schedule_list`;
  public static SCHEDULE_DETAIL_URL = `${environment.apiUrl}api/common/get?action=schedule_detail&recordId=`;
}
