import { Component, OnInit } from '@angular/core';
import { Kitten } from '../kitten';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  //selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  kittens: Kitten[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.post<Kitten[]>(environment.serverUrl + '/home', { responseType: 'text', withCredentials: true })
      .subscribe( data => this.kittens = data);
  }

  addToCart(k: Kitten){
    alert(k.name + ' hozzáadva a kosárhoz!');
    const cartAll = localStorage.getItem('cart');
    let cart;
    if (cartAll){
      cart = JSON.parse(cartAll);
    } else {
      cart = [];
    }
    cart.push(k);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

}
