import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/productCategory';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  

  constructor(private http: HttpClient) {}

  fetchPorducts() {
    return this.http
      .get<GetResponseProducts>('http://localhost:8070/api/products?size=100')
      .pipe(map((response) => response._embedded.Product));
  }

  findByCategoryId(id: number) {
    const url: string =
      'http://localhost:8070/api/products/search/findByCategoryId?id=' + id;
    return this.http
      .get<GetResponseProducts>(url)
      .pipe(map((response) => response._embedded.Product));
  }

  fetchCategories() {
    return this.http
      .get<GetResponseCategories>('http://localhost:8070/api/product-category')
      .pipe(
        map((res) => {
          return res._embedded.ProductCategory;
        })
      );
  }

  findProductByName(productName: string) {
    const url =
      'http://localhost:8070/api/products/search/findByName?name=' +
      productName;
    return this.http
      .get<GetResponseProducts>(url)
      .pipe(map((response) => response._embedded.Product));
  }

  findProductById(productId: number) {
    const url =
      'http://localhost:8070/api/products/search/findById?id=' + productId;
    return this.http.get<GetResponseProducts>(url).pipe(
      map((resp)=>resp._embedded.Product[0]
      )
    );
  }

  getProductListPaginate(thePageNumber:number,thePageSize:number){
    return this.http
      .get<GetResponseProducts>(`http://localhost:8070/api/products?page=${thePageNumber}&size=${thePageSize}`)
  }

  findByCategoryIdPaginate(id: number,thePageNumber:number,thePageSize:number) {
    const url: string =
      'http://localhost:8070/api/products/search/findByCategoryId?id=' + id+`&page=${thePageNumber}&size=${thePageSize}`;
    return this.http
      .get<GetResponseProducts>(url)
  }

  findPorductByNamePaginate(productName:string,thePageNumber:number,thePageSize:number){
    const url =
      'http://localhost:8070/api/products/search/findByName?name=' +
      productName +`&page=${thePageNumber}&size=${thePageSize}`;
    return this.http
      .get<GetResponseProducts>(url)
  }


}


export interface GetResponseProducts {
  _embedded: {
    Product: Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}
export interface GetResponseCategories {
  _embedded: {
    ProductCategory: ProductCategory[];
  };
}
