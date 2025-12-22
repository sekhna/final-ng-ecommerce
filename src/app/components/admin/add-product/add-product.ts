import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { urlValidator } from '../../../core/validators/url.validator';
import { ProductService } from '../../../core/services/product-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  productForm: FormGroup;
  productService = inject(ProductService);
  snackBar = inject(MatSnackBar);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      category: ['', Validators.required],
      image: ['', urlValidator()]
    });
  }

  onSubmit() {
    this.productService.addProduct(this.productForm.value).subscribe(res=>{
      if(res){
        this.snackBar.open('Product added successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/products']);
      }
      else{
        this.snackBar.open('Error during adding Product', 'Close', { duration: 3000 });
      }
    });
  }
}
