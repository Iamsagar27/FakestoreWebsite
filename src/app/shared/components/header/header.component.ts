import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { CartUiService } from 'src/app/features/cart/cart-ui.service';
import { CartService } from 'src/app/features/cart/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
constructor(public cartUi: CartUiService, private cart : CartService) {}

  cartCount = computed(() => this.cart.items().length);

  openCart() {
    this.cartUi.toggle();
  }
}
