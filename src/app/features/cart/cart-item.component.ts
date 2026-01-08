import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../core/models/cart.model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {

  @Input() item!: CartItem;

  @Output() quantityChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();

  changeQty(event: Event) {
    const qty = +(event.target as HTMLSelectElement).value;
    this.quantityChange.emit(qty);
  }
}
