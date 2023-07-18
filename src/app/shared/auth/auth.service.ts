import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {API} from "../../helper/api";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USER_DATA = [
    {username: 'hochiminh', password: 'vtc123',country:"Hồ Chí Minh_1"},
    {username: 'bentre', password: 'vtc123',country:"Bến Tre_2"},
    {username: 'binhphuoc', password: 'vtc123',country:"Bình Phước_18"},
    {username: 'laichau', password: 'vtc123',country:"Lai Châu_51"},
    {username: 'thanhhoa', password: 'vtc123',country:"Thanh Hóa_42"},
  ];
  private readonly AUTH_TOKEN_KEY = 'token';

  constructor(private router: Router,
              private http: HttpClient) { }

   logIn(username: string, password: string) {
     const data = {
       username: username,
       password: password
     };

     return  this.http.post<any>(`${API.LOGIN_URL}`,data).pipe(
       map((res) => {
         localStorage.setItem(this.AUTH_TOKEN_KEY, res.token);
         localStorage.setItem('currentUser', 'Thanh Hóa_42');

         return true;
       }),
       catchError(err => {
         return of(false);
       })
     );
  }



  logOut(): void {
    let removeToken = localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem('currentUser')
    if (removeToken == null) {
      this.router.navigate(['sessions/login']);
    }
  }

  isLoggedIn(): boolean {
    const authToken = localStorage.getItem(this.AUTH_TOKEN_KEY);
    return (authToken !== null) ? true : false;
  }


}
