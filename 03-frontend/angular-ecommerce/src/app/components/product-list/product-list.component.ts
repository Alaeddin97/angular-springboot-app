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
  name: string = '';
  noProductFound: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.name = params['name'];
      this.id = +params['id'];
      console.log(this.name);
      

      if (this.name) {
        this.productService
          .findProductByName(this.name)
          .subscribe((products: Product[]) => {
            products.length > 0
              ? (this.loadedProducts = products)
              : (this.noProductFound = true);
              console.log(this.noProductFound);
              
          });
      } else if (
        this.id === 1 ||
        this.id === 2 ||
        this.id === 3 ||
        this.id === 4
      ) {
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

  onDetails(index:number){
    console.log(`Index: ${index}`);
    
    this.router.navigate(['products',index+1,'details']);
  }
}

