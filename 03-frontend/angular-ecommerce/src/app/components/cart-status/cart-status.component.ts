import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  
  price:number=0;
  items:number=0;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.totalQuantity.subscribe((items:number)=>this.items=items);
    this.cartService.totalPrice.subscribe(
      (price:number)=>{
        this.price=price;
      });
    
  }

}
