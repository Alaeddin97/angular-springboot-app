import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orderResponse } from '../common/orderResponse';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  url: string = 'http://localhost:8070/api/checkout/purchase';
  constructor(private http: HttpClient) {}

  placeOrder(purchase:Purchase):Observable<orderResponse>{
    return this.http.post<orderResponse>(this.url,purchase);
  }
}
