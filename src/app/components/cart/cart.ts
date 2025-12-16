import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart-service';
import { ICartItem } from '../../models/cart-item.model';
import { BehaviorSubject } from 'rxjs';
import { CartProduct } from './cart-product/cart-product';
import { CartSummary } from './cart-summary/cart-summary';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CartProduct, CartSummary, AsyncPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cart: BehaviorSubject<ICartItem[]> | undefined;
  cartService = inject(CartService);

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }
}
