import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import {
  GetResponseProducts,
  ProductService,
} from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  loadedProducts: Product[] = [];
  categoryId: number = 0;
  name: string = '';
  noProductFound: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.name = params['name'];
      this.categoryId = +params['id'];
      this.thePageNumber=1;

      if (this.name) {
        this.productService
          .findProductByName(this.name)
          .subscribe((products: Product[]) => {
            if (products.length > 0) {
              this.loadedProducts = products;
              this.noProductFound = false;
            } else {
              this.noProductFound = true;
              console.log(this.noProductFound);
            }
          });
      } else if (
        this.categoryId === 1 ||
        this.categoryId === 2 ||
        this.categoryId === 3 ||
        this.categoryId === 4
      ) {
        this.findByCategoryId();
      } else {
        // this.fetchProducts();
        this.productListPaginated();
      }
    });
  }

  fetchProducts() {
    this.productService.fetchPorducts().subscribe((res) => {
      this.loadedProducts = res;
      console.log(res);
    });
  }

  findByCategoryId() {
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
        console.log(this.loadedProducts);
        console.log(this.thePageNumber);
      });
  }

  onDetails(index: number) {
    console.log(`Index: ${index}`);
    this.router.navigate(['products', index + 1, 'details']);
  }

  productListPaginated() {
    this.productService
      .getProductListPaginate(this.thePageNumber - 1, this.thePageSize)
      .subscribe((products) => {
        this.loadedProducts = products._embedded.Product;
        this.thePageNumber = products.page.number + 1;
        this.thePageSize = products.page.size;
        this.theTotalElements = products.page.totalElements;
        console.log(this.loadedProducts);
        console.log(this.thePageNumber);
      });
  }

  updateSize(size:string){
    this.thePageSize=+size;
    this.thePageNumber=1;
    this.categoryId !== 1 &&
    this.categoryId !== 2 &&
    this.categoryId !== 3 &&
    this.categoryId !== 4
      ? this.productListPaginated()
      : this.findByCategoryId()
  }
}
