import {environment} from "src/environments/environment";

export class API {
  public static IPPBXEXTEN_URL = `${environment.apiUrl}lookups/model/Ippbxextenlocation`;  //loa
  public static INFORBOARD_URL = `${environment.apiUrl}lookups/model/Inforboard`; //bản tin điện tử
  public static RADIOSTREAM_URL = `${environment.apiUrl}lookups/model/Radiostreamingactivity`; //bản tin phát hành
  public static RADIONODE_URL = `${environment.apiUrl}lookups/model/Radionode`; //nhà cung cấp
  public static PLAYSTREAM_URL = `${environment.apiUrl}lookups/model/Playstreams`; //loại bản tin
  public static RADIOSTREAMING_URL = `${environment.apiUrl}lookups/model/Radiostreaming`; //quản lý phát thanh
  public static PLAYSCHEDULE_URL = `${environment.apiUrl}lookups/model/Playschedule`; //lập lịch làm việc
  public static DISTRICTS_URL = `${environment.apiUrl}lookups/model/Districts`; //quận
  public static WARDS_URL = `${environment.apiUrl}lookups/model/Wards`; //xã
  public static CITIES_URL = `${environment.apiUrl}lookups/model/Provinces`; //xã
  public static FIELDSOURCE_URL = `${environment.apiUrl}_data/FieldSource`; //TNN theo lĩnh vực
  public static GEOGRAPHICSOURCE_URL = `${environment.apiUrl}_data/GeographicSource`;
  public static WARNINGCONTENT_URL = `${environment.apiUrl}_data/WarningContent`;
  public static REGISTRATIONCONTENT_URL = `${environment.apiUrl}_data/RegistrationContent`;
  public static EDITORIALCONTENT_URL = `${environment.apiUrl}_data/EditorialContent`;
  public static EMERGENCYBROADCASTING_URL = `${environment.apiUrl}_data/EmergencyBroadcasting`;
  public static DASHBOARD_URL = `http://10.0.0.117:8089/api/common/get?action=dashboard`;
  public static LOGIN_URL = `http://10.0.0.117:8089/api/account/Login`

}
