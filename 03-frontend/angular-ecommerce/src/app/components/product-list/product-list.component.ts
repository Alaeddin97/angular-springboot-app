import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  loadedProducts: Product[] = [];
  categoryId!: number;
  productName!: string;
  noProductFound: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productName = params['name'];
      this.categoryId = +params['id'];
      this.thePageNumber = 1;

      if (this.productName) {
        this.findProductByNamePaginate();
      }
      if (this.categoryId) {
        this.findByCategoryIdPaginate();
      }
      if (!this.categoryId && !this.productName) {
        this.productListPaginate();
      }
    });
  }

  // fetchProducts() {
  //   this.productService.fetchPorducts().subscribe((res) => {
  //     this.loadedProducts = res;
  //     console.log(res);
  //   });
  // }

  findByCategoryIdPaginate() {
    // this.productService.findByCategoryId(id).subscribe((res) => {
    //   this.loadedProducts = res;
    //   console.log(res);
    // });

    this.productService
      .findByCategoryIdPaginate(
        this.categoryId,
        this.thePageNumber - 1,
        this.thePageSize
      )
      .subscribe((products) => {
        this.loadedProducts = products._embedded.Product;
        this.thePageNumber = products.page.number + 1;
        this.thePageSize = products.page.size;
        this.theTotalElements = products.page.totalElements;
      });
  }

  onDetails(index: number) {
    console.log(`Index: ${index}`);
    this.router.navigate(['products', index + 1, 'details']);
  }

  productListPaginate() {
    this.productService
      .getProductListPaginate(this.thePageNumber - 1, this.thePageSize)
      .subscribe((products) => {
        this.loadedProducts = products._embedded.Product;
        this.thePageNumber = products.page.number + 1;
        this.thePageSize = products.page.size;
        this.theTotalElements = products.page.totalElements;
      });
  }

  findProductByNamePaginate() {
    this.productService
      .findPorductByNamePaginate(
        this.productName,
        this.thePageNumber - 1,
        this.thePageSize
      )
      .subscribe((products) => {
        this.loadedProducts = products._embedded.Product;
        this.thePageNumber = products.page.number + 1;
        this.thePageSize = products.page.size;
        this.theTotalElements = products.page.totalElements;
      });
  }

  updateSize(size: string) {
    this.thePageSize = +size;
    this.thePageNumber = 1;

    if (this.productName) {
      this.findProductByNamePaginate();
    } else if (this.categoryId) {
      this.findByCategoryIdPaginate();
    } else {
      this.productListPaginate();
    }
  }

  pageChange() {
    if (this.productName) {
      this.findProductByNamePaginate();
    } else if (this.categoryId) {
      this.findByCategoryIdPaginate();
    } else {
      this.productListPaginate();
    }
  }

  addItem(product: Product) {
    this.cartService.cartUpdate(new CartItem(product));
  }
}
