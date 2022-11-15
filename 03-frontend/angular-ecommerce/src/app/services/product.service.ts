import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/ProductCategory';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  products:Subject<Product[]>=new EventEmitter<Product[]>();
  constructor(private http: HttpClient) {}

  fetchPorducts() {
    return this.http
      .get<GetResponse>('http://localhost:8070/api/products?size=100')
      .pipe(map((response) => response._embedded.Product));
  }

  findByCategoryId(id: number) {
    const url: string =
      'http://localhost:8070/api/products/search/findByCategoryId?id=' + id;
    return this.http
      .get<GetResponse>(url)
      .pipe(map((response) => response._embedded.Product));
  }

  fetchCategories() {
    return this.http
      .get<GetCategories>('http://localhost:8070/api/product-category')
      .pipe(
        map((res) => {
          return res._embedded.ProductCategory;
        })
      );
  }

  findProductByName(productName:string){
    const url='http://localhost:8070/api/products/search/findByName?name=' + productName;
    return this.http
    .get<GetResponse>(url)
    .pipe(map((response) => response._embedded.Product));
  }
}

export interface GetResponse {
  _embedded: {
    Product: Product[];
  };
}
export interface GetCategories {
  _embedded: {
    ProductCategory: ProductCategory[];
  };
}
