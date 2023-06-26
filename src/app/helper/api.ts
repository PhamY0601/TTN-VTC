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
  public static DASHBOARD_URL = `${environment.apiUrl}ttn_api/api/common/get?action=dashboard`;
  public static INSTALLATION_URL = `${environment.apiUrl}ttn_api/api/common/get?action=installation`;
  public static LOGIN_URL = `${environment.apiUrl}ttn_test/api/account/Login`;
  public static POST_EMERGENCYBROADCASTING_URL = `${environment.apiUrl}/ttn_test/api/app/addSosRecord`
  public static EMERGENCYBROADCASTING_URL = `${environment.apiUrl}ttn_test/api/common/get?action=emergency_audio`;
  public static EMERGENCYBROADCASTING_DETAIL_URL =  `${environment.apiUrl}ttn_test/api/common/get?action=emergency_audio_details&id=`;
  public static AUDIO_URL = `${environment.apiUrl}ttn_test/ttn_/tts/`;
  public static LOCATIONS_URL = `${environment.apiUrl}ttn_test/api/common/get?action=locations`;
}
