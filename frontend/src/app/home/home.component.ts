import { Component, OnInit } from '@angular/core';
import { Kitten } from '../kitten';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  kittens: Kitten[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.post<Kitten[]>('http://localhost:3000/home', { responseType: 'text', withCredentials: true })
      .subscribe( data => this.kittens = data);
  }

}
