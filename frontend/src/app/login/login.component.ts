import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {
    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()){
      this.authService.resetUserInfo();
    }
  }

  login(): void {
    if (this.username !== '' && this.password !== '') {
      this.authService.logIn(this.username, this.password).subscribe(res => {
        console.log(res);
        this.authService.setUserInfo(this.username);
        this.router.navigate(['home']);
        }, error => {
         console.log(error);
         alert('Hibás belépési adatok!');
      });
    }
  }
}
