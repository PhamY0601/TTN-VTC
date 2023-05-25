export const COUNTRY = function(){ return  localStorage.getItem('currentUser')}
export const COUNTRY_TITLE = function(){ return  localStorage.getItem('currentUser')?.replace(/_\d+/, '')}
export const TOKEN =  function(){ return  localStorage.getItem('token')}

const now = new Date();
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
export const currentTime = `${hours}:${minutes}`;
