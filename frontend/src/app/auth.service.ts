import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('userInfo');
  }

  public setUserInfo(user: string){
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public resetUserInfo(){
    localStorage.removeItem('userInfo');
  }

  logIn = (username: string, password: string) => {
    return this.http.post(environment.serverUrl + '/login', { username, password },
      { withCredentials: true, responseType: 'text', observe: 'response' as 'response'}
      );
  }

  logOut = () => {
    console.log('logging out');
    this.resetUserInfo();
    return this.http.get(environment.serverUrl + '/logout');
  }
}
