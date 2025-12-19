import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Error404 } from './components/error-404/error-404';
import { Cart } from './components/cart/cart';
import { ProductDetails } from './components/product-details/product-details';
import { AddProduct } from './components/add-product/add-product';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: Home },
    { path: 'products/:id', component: ProductDetails },
    { path: 'cart', component: Cart },
    { path: 'admin/add-product', component: AddProduct },
    { path: '**', component: Error404 }
];
