import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    const userData = localStorage.getItem('userInfo');
    return !!(userData && JSON.parse(userData));
  }

  public setUserInfo(user: any){
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  postLoginAttempt = (email: any, password: any) => {
    return this.http.post('http://localhost:3000/authenticate', { username: email, password });
  }

  logOut = () => {
    console.log('logging out');
    return this.http.get('http://localhost:3000/logout');
  }
}
