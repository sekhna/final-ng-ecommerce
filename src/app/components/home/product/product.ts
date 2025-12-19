import { Component, inject, input } from '@angular/core';
import { IProduct } from '../../../models/product.model';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../core/services/cart-service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product',
  imports: [RouterLink, CurrencyPipe, MatIconModule, MatButtonModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductComponent {
  product = input.required<IProduct>();
  cartService = inject(CartService);

  addProductToCart(): void {
    this.cartService.addToCart(this.product()!)
  }
}
