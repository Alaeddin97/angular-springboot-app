import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product!: Product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService:CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productId = params['id'];
      
      if (this.productId) {
        this.productService
          .findProductById(this.productId)
          .subscribe((product: Product) => {
            this.product = product;
          });
      }
    });
  }

  addItem(){
    this.cartService.cartUpdate(new CartItem(this.product));
  }
}
