import { Component, OnInit } from '@angular/core';
import { Kitten } from '../kitten';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  kittens: Kitten[];
  sumAr: number;

  constructor(private http: HttpClient) {
    this.sumAr = 0;
    this.kittens = [];
  }

  ngOnInit(): void {
    const cart = localStorage.getItem('cart');
    if (cart){
      JSON.parse(cart).forEach((kitten: Kitten) => {
        this.kittens.push(kitten);
        this.sumAr += kitten.price;
      });
    }
  }

  checkout(){
    this.http.post(environment.serverUrl + '/checkout', { kittens : this.kittens }, { responseType: 'text', withCredentials: true})
      .subscribe(msg => {
        alert('Sikeres rendelés!');
        console.log(msg);
        localStorage.removeItem('cart');
        this.sumAr = 0;
        this.kittens = [];
        this.ngOnInit();
    });
  }

}
