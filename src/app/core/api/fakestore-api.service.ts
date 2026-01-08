import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FakestoreApiService {
  private readonly BASE_URL = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.BASE_URL}/auth/login`,
      { username, password }
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/products/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/products/categories`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.BASE_URL}/products/category/${category}`
    );
  }

  getUserCart(userId: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/carts/user/${userId}`);
  }

  createCart(cart: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/carts`, cart);
  }
}
