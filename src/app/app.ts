import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { BehaviorSubject } from 'rxjs';
import { CartService } from './core/services/cart-service';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatIcon, MatBadgeModule, CommonModule],
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
