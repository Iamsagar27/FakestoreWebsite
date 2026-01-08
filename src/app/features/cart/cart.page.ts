import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart/cart.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})
export class CartPage implements OnInit {
  
  items = signal<any[]>([]);

  subtotal = computed(() =>
    this.items().reduce((sum, i) => sum + i.price * i.quantity, 0)
  );
  constructor(public cart: CartService) {}

  ngOnInit() {
    this.items.set(this.cart.getCart());
  }

  updateQty(item: any, qty: number) {
    this.cart.updateQuantity(item.id, qty);
    this.items.set(this.cart.getCart());
  }

  remove(id: number) {
    this.cart.removeItem(id);
    this.items.set(this.cart.getCart());
  }
}
