import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../../models/product.model';
import { ICartItem } from '../../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: ICartItem[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);
  private cartItems$ = new BehaviorSubject<ICartItem[]>([]);

  constructor() {
    this.loadCartFromLocalStorage();
  }

  getCart(): BehaviorSubject<ICartItem[]> {
    return this.cartItems$;
  }

  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }

  addToCart(product: IProduct): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }

    // this.cartItemCount.next(this.cartItemCount.value + 1);
    this.updateSubjects();
    this.saveCartToLocalStorage();
  }

  decreaseFromCart(productId: number): void {
    const existingItem = this.cartItems.find(item => item.product.id === productId);
    if (existingItem) {
      existingItem.quantity -= 1;
      if (existingItem.quantity === 0) {
        const itemIndex = this.cartItems.findIndex(item => item.product.id === productId);
        this.cartItems.splice(itemIndex, 1);
      }
    }

    // this.cartItemCount.next(this.cartItemCount.value - 1);
    this.updateSubjects();
    this.saveCartToLocalStorage();
  }

  removeProduct(productId: number): void {
    const existingItem = this.cartItems.find(item => item.product.id === productId);
    
    if (existingItem) {
      // const itemIndex = this.cartItems.findIndex(item => item.product.id === productId);
      // this.cartItemCount.next(this.cartItemCount.value - existingItem.quantity);
      // this.cartItems.splice(itemIndex, 1);
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);

      this.updateSubjects();
      this.saveCartToLocalStorage();
    }
  }

  saveCartToLocalStorage() {
    const cartJson = JSON.stringify(this.cartItems);
    localStorage.setItem('cart', cartJson);
  }

  loadCartFromLocalStorage() {
    const cartJson = localStorage.getItem('cart');
    if (cartJson) {
      this.cartItems = JSON.parse(cartJson);
      // const itemCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
      // this.cartItemCount.next(itemCount);
    }
    this.updateSubjects();
  }

  private updateSubjects() {
    const totalCount = this.cartItems.reduce((t, i) => t + i.quantity, 0);
    this.cartItemCount.next(totalCount);

    this.cartItems$.next([...this.cartItems]);
  }
}
