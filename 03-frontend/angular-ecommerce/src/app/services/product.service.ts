import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/ProductCategory';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  fetchPorducts(){
    return this.http
      .get<GetResponse>('http://localhost:8070/api/products?size=100')
      .pipe(map((response) => response._embedded.Product));
  }

  findByCategoryId(id:number){
    const url:string='http://localhost:8070/api/products/search/findByCategoryId?id='+id;
    return this.http.get<GetResponse>(url).pipe(
      map((response)=>response._embedded.Product)
    );
  }

  fetchCategories(){
    return this.http.get<GetCategories>('http://localhost:8070/api/product-category')
    .pipe(
      map((res)=>{return res._embedded.ProductCategory})
    );
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
