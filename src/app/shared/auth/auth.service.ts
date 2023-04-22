import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

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
  private readonly AUTH_TOKEN_KEY = 'auth_token';

  constructor(private router: Router) { }

   logIn(username: string, password: string): boolean {

   let user= this.USER_DATA.find(u => u.username.toLowerCase() === username && u.password === password);
    if (user !== undefined) {
      // Nếu đăng nhập thành công, lưu token vào LocalStorage
      const authToken = 'vtc123';
      localStorage.setItem(this.AUTH_TOKEN_KEY, authToken);
      localStorage.setItem('currentUser',user.country);
      return true;
    }
    return false;
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
