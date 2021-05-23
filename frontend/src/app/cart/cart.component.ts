import { Component, OnInit } from '@angular/core';
import { Kitten } from '../kitten';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  kittens: Kitten[] = [];
  sumAr: number;

  constructor() {
    this.sumAr = 0;
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

}
