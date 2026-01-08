import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart/cart.service';
import { CartUiService } from '../cart/cart-ui.service';
import { AppRoutingModule } from "src/app/app-routing.module";
import { Router} from '@angular/router';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, AppRoutingModule],
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.scss']
})
export class CartDrawerComponent {

  items = computed(() => this.cart.items());

  isOpen = computed(() => this.ui.isOpen());

  subtotal = computed(() =>
    this.items().reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    )
  );

  constructor(
    public cart: CartService,
    private ui: CartUiService,
    private router: Router
  ) {}

  goToCart() {
    this.router.navigate(['/cart']);
    this.close()
  }
  close() {
    this.ui.close();
  }
}
