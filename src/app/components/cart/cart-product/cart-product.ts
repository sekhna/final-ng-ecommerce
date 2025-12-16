import { Component, inject, input, Input, model } from '@angular/core';
import { ICartItem } from '../../../models/cart-item.model';
import { CartService } from '../../../core/services/cart-service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-product',
  imports: [MatIcon, MatIconButton, CurrencyPipe],
  templateUrl: './cart-product.html',
  styleUrl: './cart-product.css',
})
export class CartProduct {
  cartService = inject(CartService);

  cartItem = input.required<ICartItem>();

  increaseQuantity(): void {
    this.cartService.addToCart(this.cartItem().product);
  }

  decreaseQuantity(): void {
    this.cartService.decreaseFromCart(this.cartItem().product.id);
  }

  deleteFromCart(): void {
    this.cartService.removeProduct(this.cartItem().product.id);
  }
}
