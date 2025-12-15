import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { API_BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<IProduct[]>(`${API_BASE_URL}/products`);
  }

  getProductById(id: number) {
    return this.http.get<IProduct>(`${API_BASE_URL}/products/${id}`);
  }
}
