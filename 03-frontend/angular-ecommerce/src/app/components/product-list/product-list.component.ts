import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { GetResponse, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  loadedProducts:Product[]=[];
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(){
    this.productService.fetchPorducts().subscribe(
      (res)=>{
        this.loadedProducts=res;
        console.log(res);
        
      }
    )
  }
}
