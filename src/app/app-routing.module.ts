import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './features/auth/login.page';
import { HomePage } from './features/home/home.page';
import { ProductsPage } from './features/products/products.page';
import { ProductDetailsPage } from './features/products/product-details.page';
import { CartPage } from './features/cart/cart.page';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsPage, canActivate: [AuthGuard] },
  { path: 'products/:id', component: ProductDetailsPage, canActivate: [AuthGuard] },
  { path: 'cart', component: CartPage, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // <-- Change this line
  { path: '**', redirectTo: 'login' } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
