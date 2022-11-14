import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  loadedProducts: Product[] = [];
  id: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      if (this.id === 1 || this.id === 2 || this.id === 3 || this.id === 4) {
        this.findByCategoryId(this.id);
      } else {
        this.fetchProducts();
      }
    });
  }

  fetchProducts() {
    this.productService.fetchPorducts().subscribe((res) => {
      this.loadedProducts = res;
      console.log(res);
    });
  }

  findByCategoryId(id: number) {
    this.productService.findByCategoryId(id).subscribe((res) => {
      this.loadedProducts = res;
      console.log(res);
    });
  }
}
