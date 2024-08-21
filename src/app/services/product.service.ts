import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductResponse } from '../model/product-response';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/product'; // URL of the backend server

  constructor(private http: HttpClient) {}

  // Get all products with pagination
  getAllProducts(pageNumber: number = 1): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/getAllProducts?page=${pageNumber}`);
  }

  // Get a single product by its ID
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/getById/${productId}`);
  }

  // Add a new product
  addProduct(product: Product): Observable<any> {
    return this.http.post(`${this.baseUrl}/addProduct`, product);
  }

  // Update an existing product by ID
  updateProduct(productId: number, updatedProduct: Product): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateProduct/${productId}`, updatedProduct);
  }

  // Delete a product by its ID
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteProduct/${productId}`);
  }
}
