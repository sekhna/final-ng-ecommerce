import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { BehaviorSubject } from 'rxjs';
import { CartService } from './core/services/cart-service';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatIconModule, MatBadgeModule, CommonModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  cartService = inject(CartService)
  cartItemsCount: BehaviorSubject<number> | undefined;

  ngOnInit(): void {
    this.cartItemsCount = this.cartService.getCartItemCount();
  }

}
