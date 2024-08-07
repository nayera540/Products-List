import { Injectable } from '@angular/core';
import { Product } from '../product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`https://fakestoreapi.com/products`);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(
      `https://fakestoreapi.com/products/${productId}`
    );
  }
}
