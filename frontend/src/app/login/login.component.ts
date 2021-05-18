import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string | undefined;
  password: string | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.postLoginAttempt(this.username, this.password).subscribe(res => {
      //if (res.statusCode === 200) {
        this.authService.setUserInfo(this.username);
        this.router.navigate(['any']);
      //} else {
       // alert('Hibás belépési adatok!');
     // }
    });
  }

}
