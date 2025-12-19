import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../core/services/product-service';
import { CartService } from '../../core/services/cart-service';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, MatIconModule, MatIconButton, MatProgressSpinnerModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  productId: number | null = null;
  product = signal<IProduct | null | undefined>(undefined);
  productService = inject(ProductService);
  productQuantityInCart = 0;
  cartService = inject(CartService);

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = +(params.get('id') ?? 0);

      if (this.productId && this.productId > 0) {
        this.productService.getProductById(this.productId).subscribe((response) => {
          this.product.set(response);
        });

        this.cartService.getCart().subscribe((cart) => {
          const cartItem = cart.find(item => item.product.id === this.productId);
          this.productQuantityInCart = cartItem ? cartItem.quantity : 0;
        });
      }
    })
  }

  increaseQuantity() {
    if (this.product()) {
      this.cartService.addToCart(this.product()!);
    }
  }

  decreaseQuantity() {
    if (this.productId) {
      this.cartService.decreaseFromCart(this.productId)
    }
  }

  addProductToCart(product: IProduct | null): void {
    if (product) {
      this.cartService.addToCart(product)
    }
  }
}
