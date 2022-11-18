import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;


  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(
      (price: number) => (this.totalPrice = price)
    );
    this.cartService.totalQuantity.subscribe(
      (quantity: number) => (this.totalQuantity = quantity)
    );
    this.cartService.computeTotals();
  }

  onIncrement(name: string) {
    this.cartService.cartItems.find((item) => item.name == name).quantity++;
    this.cartService.computeTotals();
  }

  onDecrement(name: string) {
    let item: CartItem = this.cartService.cartItems.find(
      (item) => item.name == name
    );

    item.quantity--;

    if (item.quantity === 0) {
      this.remove(item);
    } else {
      this.cartService.computeTotals();
    }
  }

  remove(cartItem: CartItem) {
    let index: number = this.cartItems.findIndex(
      (item) => item.name == cartItem.name
    );
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.cartService.computeTotals();
    }
  }
}
