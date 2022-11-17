import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  cartItems: CartItem[] = [];

  constructor() {}

  cartUpdate(cartItem: CartItem) {
    let existingCartItem: CartItem = undefined;
    let alreadyExistingItem: boolean = false;

    if (this.cartItems.length > 0) {
      // for (let item of this.cartItems) {
      //   if (item.name === cartItem.name) {
      //     existingCartItem = item;
      //     break;
      //   }
      // }
     existingCartItem= this.cartItems.find((item)=>item.name===cartItem.name)
    }
    alreadyExistingItem = existingCartItem !== undefined;

    if (alreadyExistingItem) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeTotals();
  }

  computeTotals() {
    let totalQuantity: number = 0;
    let totalPrice: number = 0;
    for (let item of this.cartItems) {
      totalPrice += item.unitPrice * item.quantity;
      totalQuantity += item.quantity;
    }

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    console.log(`Total quantity: ${totalQuantity}`);
    
  }
}
