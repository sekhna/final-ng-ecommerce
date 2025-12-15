import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart-service';
import { ICartItem } from '../../models/cart-item.model';
import { IProduct } from '../../models/product.model';
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [MatIcon, MatIconButton],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cart: BehaviorSubject<ICartItem[]> | undefined;
  cartService = inject(CartService);

  ngOnInit(): void {
    this.cart = this.cartService.getCart();

    console.log(this.cart.value);
  }

  increaseQuantity(product: IProduct): void {
    this.cartService.addToCart(product);
  }

  decreaseQuantity(product: IProduct): void {
    this.cartService.decreaseFromCart(product.id);
  }

  deleteFromCart(product: IProduct): void {
    console.log(product);
    this.cartService.removeProduct(product.id);
  }
}
