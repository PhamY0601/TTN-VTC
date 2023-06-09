import {HttpHeaders} from "@angular/common/http";

export const COUNTRY = function(){ return  localStorage.getItem('currentUser')}
export const COUNTRY_TITLE = function(){ return  localStorage.getItem('currentUser')?.replace(/_\d+/, '')}
export const TOKEN =  function(){ return  localStorage.getItem('token')}

const now = new Date();
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
export const currentTime = `${hours}:${minutes}`;

export const sourceData = {
  name: 'Nguồn phát',
  completed: false,
  value: '10',
  subtasks:[
    {name: 'File âm thanh', completed: false, value: 3},
    {name: 'Văn bản', completed: false, value: 4},
    {name: 'Transmitter', completed: false, value: 1},
    {name: 'Thư viện', completed: false, value: 2},
    {name: 'Tiếp âm', completed: false, value: 5},],
};
export const voiceData = [
  {name:'Mặc định', value: 'female_north_ngochoa'},
  {name: 'Giọng nữ miền Bắc', value: 'vi_fw_female_north'},
  {name: 'Giọng nữ miền Trung', value: 'female_central'},
  {name: 'Giọng nữ miền Nam', value: 'female_south'},
  {name: 'Giọng nam miền Bắc', value: 'male_north'},
  {name: 'Giọng nam miền Trung', value: 'vi_fw_male_central'},
  {name: 'Giọng nam miền Nam', value: 'male_south'},
]

export const header = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`})
