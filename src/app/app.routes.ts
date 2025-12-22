import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Error404 } from './components/error-404/error-404';
import { Cart } from './components/cart/cart';
import { ProductDetails } from './components/product-details/product-details';
import { AddProduct } from './components/admin/add-product/add-product';
import { Login } from './components/admin/login/login';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: Home },
    { path: 'products/:id', component: ProductDetails },
    { path: 'cart', component: Cart },
    { path: 'admin/add-product', component: AddProduct },
    { path: 'admin/login', component: Login },
    { path: '**', component: Error404 }
];
