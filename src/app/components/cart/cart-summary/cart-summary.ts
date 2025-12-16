import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart-service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-summary',
  imports: [CurrencyPipe],
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.css',
})
export class CartSummary implements OnInit {
  cartService = inject(CartService)

  productsQuantityInCart = 0;
  totalSum = 0;

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      this.productsQuantityInCart = cart.reduce((sum, current) => sum + current.quantity, 0);
      this.totalSum = cart.reduce((sum, current) => sum + (current.quantity * current.product.price), 0)
    });
  }
}
