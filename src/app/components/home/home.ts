import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../core/services/product-service';
import { IProduct } from '../../models/product.model';
import { ProductComponent } from "./product/product";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [ProductComponent, CommonModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  productService = inject(ProductService);

  products = signal<IProduct[]>([]);
  searchCategory: string = '';
  searchName: string = '';
  isLoading = signal(true);

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      this.products.set(response);
      this.isLoading.set(false);
    });
  }

  get filteredProducts() {
    return this.products().filter(c =>
      c.category.toLowerCase().includes(this.searchCategory.toLowerCase())
      && c.title.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }
}
