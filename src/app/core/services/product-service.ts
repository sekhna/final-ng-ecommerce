import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { API_BASE_URL } from '../constants';
import { catchError, map, Observable, of } from 'rxjs';

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

  addProduct(product: IProduct): Observable<boolean> {
    return this.http.post(`${API_BASE_URL}/products`, product, { observe: 'response' }).pipe(
      map(response => {
        return response.ok;
      }),
      catchError(error => {
        console.error('Error while adding product:', error);
        return of(false);
      })
    );
  }
}
