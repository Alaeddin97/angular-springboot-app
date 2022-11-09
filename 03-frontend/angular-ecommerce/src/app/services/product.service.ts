import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  fetchPorducts(){
    return this.http
      .get<GetResponse>('http://localhost:8070/api/products')
      .pipe(map((response) => response._embedded.Product));
  }
}

export interface GetResponse {
  _embedded: {
    Product: Product[];
  };
}
