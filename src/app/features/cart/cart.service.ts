import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from '../../core/models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private STORAGE_KEY = 'cart';

  items = signal<CartItem[]>(this.getCart());

  subtotal = computed(() =>
    this.items().reduce((sum, i) => sum + i.price * i.quantity, 0)
  );

  getCart(): CartItem[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  saveCart(cart: CartItem[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    this.items.set(cart); 
  }

  addToCart(product: CartItem) {
  const cart = [...this.items()];
  const qty = Number(product.quantity);
  const safeQty = isNaN(qty) || qty <= 0 ? 1 : qty;

  const existing = cart.find(i => i.id === product.id);

  if (existing) {
    existing.quantity += safeQty;
  } else {
    cart.push({
      ...product,
      quantity: safeQty
    });
  }

  this.saveCart(cart);
}

  updateQuantity(id: number, qty: number) {
    const cart = this.items().map(item =>
      item.id === id ? { ...item, quantity: qty } : item
    );

    this.saveCart(cart);
  }

  removeItem(id: number) {
    const cart = this.items().filter(i => i.id !== id);
    this.saveCart(cart);
  }

  clearCart() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.items.set([]);
  }
}
