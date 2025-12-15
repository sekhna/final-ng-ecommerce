import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../core/services/product-service';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { IProduct } from '../../models/product.model';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart-service';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);

  products = signal<IProduct[]>([]);

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      this.products.set(response);
    });

    console.log(this.products());
  }

  addProductToCart(product: IProduct): void {
    this.cartService.addToCart(product)
  }
}
