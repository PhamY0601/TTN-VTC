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
    // {name: 'Thư viện', completed: false, value: 2},
    // {name: 'Tiếp âm', completed: false, value: 5},
  ],
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
export const week_day = [
  {
    name: 'Chủ nhật',
    value: 0,
    checked: false
  },
  {
    name: 'Thứ 2',
    value: 1,
    checked: false
  },
  {
    name: 'Thứ 3',
    value: 2,
    checked: false
  },
  {
    name: 'Thứ 4',
    value: 3,
    checked: false
  },
  {
    name: 'Thứ 5',
    value: 4,
    checked: false
  },
  {
    name: 'Thứ 6',
    value: 5,
    checked: false
  },
  {
    name: 'Thứ 7',
    value: 6,
    checked: false
  },
];
export const months = [
  {
    name: 'Tháng 1',
    value: 0,
    checked: false
  },
  {
    name: 'Tháng 2',
    value: 1,
    checked: false
  },
  {
    name: 'Tháng 3',
    value: 2,
    checked: false
  },
  {
    name: 'Tháng 4',
    value: 3,
    checked: false
  },
  {
    name: 'Tháng 5',
    value: 4,
    checked: false
  },
  {
    name: 'Tháng 6',
    value: 5,
    checked: false
  },
  {
    name: 'Tháng 7',
    value: 6,
    checked: false
  },
  {
    name: 'Tháng 8',
    value: 7,
    checked: false
  },
  {
    name: 'Tháng 9',
    value: 8,
    checked: false
  },
  {
    name: 'Tháng 10',
    value: 9,
    checked: false
  },
  {
    name: 'Tháng 11',
    value: 10,
    checked: false
  },
  {
    name: 'Tháng 12',
    value: 11,
    checked: false
  },
];
export const days = [
  {
    value: 0,
    display: 1,
    checked: false
  },
  {
    value: 1,
    checked: false,
    display: 2
  },
  {
    value: 2,
    checked: false,
    display: 3
  },
  {
    value: 3,
    checked: false,
    display: 4
  },
  {
    value: 4,
    checked: false,
    display: 5
  },
  {
    value: 5,
    checked: false,
    display: 6
  },
  {
    value: 6,
    checked: false,
    display: 7
  },
  {
    value: 7,
    checked: false,
    display: 8
  },
  {
    value: 8,
    checked: false,
    display: 9
  },
  {
    value: 9,
    checked: false,
    display: 10
  },
  {
    value: 10,
    checked: false,
    display: 11
  },
  {
    value: 12,
    checked: false,
    display: 13
  },
  {
    value: 13,
    checked: false,
    display: 14
  },

  {
    value: 13,
    checked: false,
    display: 14
  },
  {
    value: 14,
    checked: false,
    display: 15
  },
  {
    value: 15,
    checked: false,
    display: 16
  },
  {
    value: 16,
    checked: false,
    display: 17
  },
  {
    value: 17,
    checked: false,
    display: 18
  },
  {
    value: 18,
    checked: false,
    display: 19
  },
  {
    value: 19,
    checked: false,
    display: 20
  },
  {
    value: 20,
    checked: false,
    display: 21
  },
  {
    value: 21,
    checked: false,
    display: 22
  },
  {
    value: 22,
    checked: false,
    display: 23
  },
  {
    value: 23,
    checked: false,
    display: 24
  },
  {
    value: 24,
    checked: false,
    display: 25
  },

  {
    value: 25,
    checked: false,
    display: 26
  },
  {
    value: 26,
    checked: false,
    display: 27
  },
  {
    value: 27,
    checked: false,
    display: 28
  },
  {
    value: 28,
    checked: false,
    display: 29
  },
  {
    value: 29,
    checked: false,
    display: 30
  },
  {
    value: 30,
    checked: false,
    display: 31
  },

];
