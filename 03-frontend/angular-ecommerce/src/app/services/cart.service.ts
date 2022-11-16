import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';

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
    let totalQuentity: number = 0;
    let totalPrice: number = 0;
    for (let item of this.cartItems) {
      totalPrice += item.unitPrice * item.quantity;
      totalQuentity += item.quantity;
      console.log(`total quantity: ${totalQuentity}`);
    }

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuentity);
  }
}
